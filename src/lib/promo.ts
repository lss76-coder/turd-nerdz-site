// Fetches how many launch-promo spots are still available from the same
// Google Apps Script webhook that logs leads (see google-apps-script/leads.gs)
// — it tracks the authoritative claimed count, since every booking passes
// through it. Returns null if the webhook isn't configured or unreachable,
// so callers can just hide the promo banner rather than show a stale count.
export async function fetchPromoSpotsLeft(): Promise<number | null> {
  const url = process.env.NEXT_PUBLIC_LEADS_WEBHOOK_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    return typeof data.promoSpotsLeft === "number" ? data.promoSpotsLeft : null;
  } catch {
    return null;
  }
}
