// Logs a lead/form submission to the Google Sheet configured via
// NEXT_PUBLIC_LEADS_WEBHOOK_URL (a deployed Google Apps Script Web App —
// see /google-apps-script/leads.gs for the script and setup steps).
//
// Every caller fires this and then immediately sets window.location.href
// to a mailto: link in the same handler, which can unload the page before
// a plain fetch() finishes sending — so this uses `keepalive: true`, which
// tells the browser to keep the request alive past page unload (the same
// guarantee navigator.sendBeacon gives). We use fetch instead of sendBeacon
// itself because sendBeacon is a common target for ad blockers and privacy
// extensions (it's the same API analytics trackers use, so many blocklists
// patch it into a silent no-op that still reports success) — a plain fetch
// to an arbitrary Google Apps Script URL doesn't match those patterns.
// If the env var isn't set yet, it's a silent no-op — every form's
// mailto: fallback still fires either way.
export function logLead(sheetTab: string, fields: Record<string, string | number | boolean>) {
  const url = process.env.NEXT_PUBLIC_LEADS_WEBHOOK_URL;
  if (!url) return;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: sheetTab, ...fields }),
    keepalive: true,
  }).catch((err) => {
    console.error(`logLead: failed to reach webhook for "${sheetTab}"`, err);
  });
}
