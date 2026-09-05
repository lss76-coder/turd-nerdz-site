"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/config";
import { logLead } from "@/lib/sendLead";
import { buildEmailBody } from "@/lib/formatEmail";
import { sendEmail } from "@/lib/sendEmail";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = "Notify me when the Client Portal launches";
    const body = buildEmailBody("New portal waitlist signup from theturdnerdz.com/portal.", [
      { fields: { Email: email } },
    ]);
    logLead("Portal Waitlist", { Email: email });

    const emailed = await sendEmail(subject, body);
    if (!emailed) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <p className="font-heading text-sm font-bold text-green-dark">
        Got it — we&apos;ll email you the moment it&apos;s live, discount code
        included.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm text-cream/85">
        Drop your email and we&apos;ll let you know the second the portal
        goes live — plus you&apos;ll get{" "}
        <span className="font-heading font-bold text-white">
          25% off your first month
        </span>{" "}
        just for being on the list.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          required
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full border-2 border-teal/15 bg-white px-5 py-3 text-charcoal outline-none placeholder:text-charcoal/50 focus:border-coral"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-coral px-6 py-3 font-heading font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Notify Me
        </button>
      </form>
    </div>
  );
}
