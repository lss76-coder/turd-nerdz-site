// Posts a lead notification to /api/lead, which sends it via Resend.
// Returns true only on confirmed delivery — callers should fall back to a
// mailto: link if this returns false (e.g. RESEND_API_KEY isn't set up
// yet, or the request fails), so nothing gets silently lost during the
// transition to real email sending.
export async function sendEmail(subject: string, body: string): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data?.ok === true;
  } catch {
    return false;
  }
}
