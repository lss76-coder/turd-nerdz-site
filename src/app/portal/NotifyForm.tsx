"use client";

import { useState } from "react";
import { logLead } from "@/lib/sendLead";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    logLead("Portal Waitlist", { Email: email });
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
