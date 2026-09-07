// Logs a lead/form submission to the Google Sheet configured via
// NEXT_PUBLIC_LEADS_WEBHOOK_URL (a deployed Google Apps Script Web App —
// see /google-apps-script/leads.gs for the script and setup steps). Uses
// `keepalive: true` so the request survives a same-tick page navigation.
// If the env var isn't set yet, it's a silent no-op.
//
// Returns the parsed JSON response (or null on any failure) — most callers
// can ignore it, but a "Bookings" submission uses it to find out whether
// the launch promo was applied, since that's decided server-side.
export async function logLead(
  sheetTab: string,
  fields: Record<string, string | number | boolean>
): Promise<Record<string, unknown> | null> {
  const url = process.env.NEXT_PUBLIC_LEADS_WEBHOOK_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ type: sheetTab, ...fields }),
      keepalive: true,
    });
    return await res.json();
  } catch (err) {
    console.error(`logLead: failed to reach webhook for "${sheetTab}"`, err);
    return null;
  }
}
