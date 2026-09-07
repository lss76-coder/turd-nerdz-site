/**
 * The Turd Nerdz — lead-capture webhook.
 *
 * Receives a POST from the website every time someone submits the quote
 * flow, the contact form, a referral, or the portal waitlist, appends a
 * row to a tab named after that lead type (creating the tab and header
 * row automatically the first time each type shows up), and emails a
 * notification using the Google account that owns this script — no
 * separate email service or API key needed.
 *
 * ── One-time setup ──────────────────────────────────────────────────
 * 1. Go to sheets.google.com and create a new blank spreadsheet.
 *    Name it something like "Turd Nerdz Leads".
 * 2. In that sheet: Extensions → Apps Script.
 * 3. Delete whatever's in the editor and paste this entire file in.
 * 4. Update NOTIFY_EMAIL below if you want notifications sent somewhere
 *    other than info@theturdnerdz.com.
 * 5. Click Deploy → New deployment.
 *      - Type: "Web app"
 *      - Description: "Leads webhook"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *    (This last setting sounds scarier than it is — nobody can read your
 *    sheet through this URL, they can only POST a new row into it, and
 *    only your website will actually know the URL.)
 * 6. Click Deploy, authorize it with your Google account when prompted —
 *    the authorization screen will ask for permission to send email as
 *    you; that's this script's notification feature, not a third party.
 * 7. Copy the "Web app URL" it gives you (ends in /exec).
 * 8. Give that URL to Claude, or add it yourself as
 *    NEXT_PUBLIC_LEADS_WEBHOOK_URL in the site's .env.local file, then
 *    redeploy the site.
 *
 * That's it — every new submission on the site shows up as a new row
 * (tabs: "Quote Leads", "Bookings", "Contact Messages", "Referrals",
 * "Portal Waitlist") AND triggers an email to NOTIFY_EMAIL.
 *
 * If you ever change this file after the first deploy, use
 * Deploy → Manage deployments → edit (pencil icon) → New version, or the
 * URL will keep running the old code.
 */

var NOTIFY_EMAIL = "info@theturdnerdz.com";

// Launch promo: 50% off for the first PROMO_MONTHS months, limited to the
// first PROMO_TOTAL_SPOTS bookings. This value must match PROMO_TOTAL_SPOTS
// in src/lib/config.ts on the website — that copy is just for display
// (the "X spots left" banner); this script is the actual source of truth
// for when the deal runs out, since it's the only thing every booking
// passes through.
var PROMO_TOTAL_SPOTS = 10;

// One-time manual step if email notifications ever come back as
// "permission" errors: in the toolbar dropdown next to the Run button,
// select "authorizeMailPermission", click Run, and approve the Google
// permission popup that appears (specifically the "send email as you"
// line). Deploying the web app requests this scope but doesn't always
// force you through the actual grant screen — running any function by
// hand always does.
function authorizeMailPermission() {
  MailApp.sendEmail(NOTIFY_EMAIL, "Turd Nerdz script — permission test", "If you got this, email sending is authorized.");
}

// Reads/writes the running claimed-spot count in a "Promo" tab (cell B1),
// guarded by a script lock so two bookings landing at the same instant
// can't both slip in as the "last" spot. Returns the count of spots
// claimed *before* this call — pass claim=true to also reserve one.
function promoSpotsClaimed(claim) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Promo");
    if (!sheet) {
      sheet = ss.insertSheet("Promo");
      sheet.getRange("A1").setValue("Spots claimed (50% off, first " + PROMO_TOTAL_SPOTS + ")");
      sheet.getRange("B1").setValue(0);
    }
    var claimed = Number(sheet.getRange("B1").getValue()) || 0;
    if (claim && claimed < PROMO_TOTAL_SPOTS) {
      sheet.getRange("B1").setValue(claimed + 1);
    }
    return claimed;
  } finally {
    lock.releaseLock();
  }
}

// Lets the website ask "how many spots are left?" without submitting
// anything, so it can show a live countdown on the promo banner.
function doGet(e) {
  var claimed = promoSpotsClaimed(false);
  var spotsLeft = Math.max(0, PROMO_TOTAL_SPOTS - claimed);
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, promoSpotsLeft: spotsLeft, promoTotalSpots: PROMO_TOTAL_SPOTS })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var tabName = data.type || "Leads";
  delete data.type;

  data["Submitted At"] = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

  // Only an actual booking (not a quote lead, contact message, etc.) can
  // claim a promo spot — and only once, right here, so nothing external
  // can call this twice for the same person.
  var promoApplied = false;
  var spotsLeftAfter = null;
  if (tabName === "Bookings") {
    var claimedBefore = promoSpotsClaimed(true);
    promoApplied = claimedBefore < PROMO_TOTAL_SPOTS;
    spotsLeftAfter = Math.max(0, PROMO_TOTAL_SPOTS - (claimedBefore + (promoApplied ? 1 : 0)));
    data["Promo Deal"] = promoApplied
      ? "Yes — 50% off first 3 months (spot #" + (claimedBefore + 1) + ")"
      : "No — spots filled";
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }

  var lastCol = sheet.getLastColumn();
  var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  // Keep "Submitted At" as the first column, then add any new fields as
  // new columns on the right so nothing already logged shifts around.
  var orderedKeys = ["Submitted At"].concat(
    Object.keys(data).filter(function (k) {
      return k !== "Submitted At";
    })
  );

  orderedKeys.forEach(function (key) {
    if (headers.indexOf(key) === -1) {
      headers.push(key);
      sheet.getRange(1, headers.length).setValue(key);
    }
  });

  var row = headers.map(function (h) {
    return data[h] !== undefined ? data[h] : "";
  });
  sheet.appendRow(row);

  var notifyResult = sendNotification(tabName, headers, row);
  writeDebugStatus(notifyResult);

  var response = { ok: true, notify: notifyResult };
  if (tabName === "Bookings") {
    response.promoApplied = promoApplied;
    response.promoSpotsLeft = spotsLeftAfter;
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Writes the outcome of the last notification attempt into a "Debug" tab
// (cell A1) so it's visible right in the spreadsheet — no digging through
// Apps Script's execution logs required.
function writeDebugStatus(result) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Debug");
  if (!sheet) {
    sheet = ss.insertSheet("Debug");
    sheet.getRange(1, 1).setValue("Last email notification attempt:");
  }
  sheet.getRange(2, 1).setValue(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " — " + result);
}

// Groups each lead type's fields into labeled sections instead of one long
// flat list, so the notification email reads like the form the customer
// actually filled out. Anything that shows up in a field but isn't listed
// here (e.g. a brand-new form field) still gets printed, tacked onto an
// "Other" section at the end — nothing is ever silently dropped.
var SECTION_MAP = {
  "Bookings": [
    { title: "Contact Info", fields: ["Name", "Phone", "Email", "Street", "City", "ZIP"] },
    { title: "Service Details", fields: ["Dogs", "Frequency", "Yard size", "Preferred start date", "Yard deodorizing add-on", "Price", "Promo Deal"] },
    { title: "Access & Safety", fields: ["Yard type", "Dog safety notes", "Gate location", "Trash can location", "Gate code", "Community/entry code"] },
    { title: "Other", fields: ["Dog names, behavior & notes", "How they heard about us", "Previous customer"] },
  ],
  "Quote Leads": [
    { title: "Lead", fields: ["Phone", "ZIP", "Dogs", "Frequency", "Yard size"] },
  ],
  "Contact Messages": [
    { title: "Contact Info", fields: ["Name", "Phone", "Email"] },
    { title: "Message", fields: ["Message"] },
  ],
  "Referrals": [
    { title: "Referring Customer", fields: ["Referring customer", "Referring customer email"] },
    { title: "Friend Being Referred", fields: ["Friend's name", "Friend's phone or email"] },
  ],
  "Portal Waitlist": [
    { title: "Details", fields: ["Email"] },
  ],
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Builds { sections, submittedAt } — the field data grouped for display,
// in a shape that both the HTML and plain-text renderers below can share.
function groupFields(tabName, headers, row) {
  var data = {};
  headers.forEach(function (h, i) {
    data[h] = row[i];
  });
  var submittedAt = data["Submitted At"];

  var layout = SECTION_MAP[tabName] || [];
  var used = { "Submitted At": true };
  var sections = layout
    .map(function (section) {
      var fields = section.fields
        .filter(function (key) {
          return data[key] !== undefined && data[key] !== "";
        })
        .map(function (key) {
          used[key] = true;
          return { label: key, value: data[key] };
        });
      return { title: section.title, fields: fields };
    })
    .filter(function (section) {
      return section.fields.length > 0;
    });

  var leftover = headers
    .filter(function (h) {
      return !used[h] && data[h] !== "";
    })
    .map(function (h) {
      return { label: h, value: data[h] };
    });
  if (leftover.length > 0) {
    sections.push({ title: layout.length > 0 ? "Other" : "Details", fields: leftover });
  }

  return { sections: sections, submittedAt: submittedAt };
}

function buildHtmlBody(tabName, grouped) {
  var sectionsHtml = grouped.sections
    .map(function (section) {
      var rows = section.fields
        .map(function (f) {
          var value = escapeHtml(f.value);
          if (f.label === "Phone" && /\d{7,}/.test(String(f.value).replace(/\D/g, ""))) {
            var tel = String(f.value).replace(/\D/g, "");
            value = '<a href="tel:' + tel + '" style="color:#c1440e;text-decoration:none;font-weight:600;">' + value + "</a>";
          }
          if (f.label === "Email") {
            value = '<a href="mailto:' + escapeHtml(f.value) + '" style="color:#c1440e;text-decoration:none;">' + value + "</a>";
          }
          return (
            '<tr>' +
            '<td style="padding:4px 12px 4px 0;color:#5b6b66;font-size:13px;white-space:nowrap;vertical-align:top;">' +
            escapeHtml(f.label) +
            "</td>" +
            '<td style="padding:4px 0;color:#1f2d2a;font-size:14px;">' +
            value +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
      return (
        '<div style="margin-bottom:18px;">' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#2f6f62;border-bottom:2px solid #eef3f1;padding-bottom:4px;margin-bottom:6px;">' +
        escapeHtml(section.title) +
        "</div>" +
        '<table cellpadding="0" cellspacing="0" role="presentation">' +
        rows +
        "</table>" +
        "</div>"
      );
    })
    .join("");

  return (
    '<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:520px;margin:0 auto;">' +
    '<div style="background:#2f6f62;padding:16px 20px;border-radius:10px 10px 0 0;">' +
    '<span style="color:#ffffff;font-size:16px;font-weight:700;">New ' +
    escapeHtml(tabName) +
    "</span>" +
    '<div style="color:#cfe3dd;font-size:12px;margin-top:2px;">' +
    escapeHtml(grouped.submittedAt) +
    "</div>" +
    "</div>" +
    '<div style="border:1px solid #eef3f1;border-top:none;border-radius:0 0 10px 10px;padding:18px 20px;">' +
    sectionsHtml +
    '<div style="font-size:11px;color:#9aa6a2;margin-top:4px;">Logged in the &quot;' +
    escapeHtml(tabName) +
    '&quot; tab of your Leads sheet.</div>' +
    "</div>" +
    "</div>"
  );
}

function buildPlainTextBody(tabName, grouped) {
  var blocks = grouped.sections.map(function (section) {
    var heading = section.title.toUpperCase();
    var fieldLines = section.fields.map(function (f) {
      return "  " + f.label + ": " + f.value;
    });
    return heading + "\n" + fieldLines.join("\n");
  });

  return (
    "New " + tabName + " — " + grouped.submittedAt + "\n\n" +
    blocks.join("\n\n") +
    "\n\nLogged in the \"" + tabName + "\" tab of your Leads sheet."
  );
}

function sendNotification(tabName, headers, row) {
  var grouped = groupFields(tabName, headers, row);

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New " + tabName + " — The Turd Nerdz",
      body: buildPlainTextBody(tabName, grouped),
      htmlBody: buildHtmlBody(tabName, grouped),
    });
    return "sent to " + NOTIFY_EMAIL;
  } catch (err) {
    // Don't let a mail hiccup (e.g. daily quota) break the actual save —
    // the row above is already written either way.
    return "FAILED: " + err;
  }
}
