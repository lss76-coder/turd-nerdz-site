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

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var tabName = data.type || "Leads";
  delete data.type;

  data["Submitted At"] = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

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

  return ContentService.createTextOutput(JSON.stringify({ ok: true, notify: notifyResult })).setMimeType(
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

function sendNotification(tabName, headers, row) {
  var lines = headers.map(function (h, i) {
    return h + ": " + row[i];
  });

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New " + tabName + " — The Turd Nerdz",
      body: lines.join("\n") + "\n\nLogged in the \"" + tabName + "\" tab of your Leads sheet.",
    });
    return "sent to " + NOTIFY_EMAIL;
  } catch (err) {
    // Don't let a mail hiccup (e.g. daily quota) break the actual save —
    // the row above is already written either way.
    return "FAILED: " + err;
  }
}
