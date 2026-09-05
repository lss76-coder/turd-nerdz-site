import { NextRequest, NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/config";

// Sends a lead notification email via Resend (https://resend.com) so a
// submission on the site actually lands in the inbox automatically —
// no dependency on the visitor's device having a default mail app, unlike
// the old mailto: links. See RESEND_SETUP.md for the one-time setup.
//
// Runs server-side (this is an API route, not client code), so the API
// key never reaches the browser.

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "The Turd Nerdz <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the caller so it can fall back gracefully
    // instead of silently pretending an email was sent.
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 501 });
  }

  let payload: { subject?: string; body?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const { subject, body } = payload;
  if (!subject || !body) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend send failed:", res.status, errText);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
