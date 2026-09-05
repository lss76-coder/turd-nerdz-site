"use client";

import { useState } from "react";
import { logLead } from "@/lib/sendLead";
import Mascot from "@/components/Mascot";

export default function ReferForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    yourName: "",
    yourEmail: "",
    friendName: "",
    friendContact: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    logLead("Referrals", {
      "Referring customer": form.yourName,
      "Referring customer email": form.yourEmail,
      "Friend's name": form.friendName,
      "Friend's phone or email": form.friendContact,
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-green/30 bg-green/10 p-8 text-center">
        <Mascot className="mx-auto h-16 w-16 animate-wiggle" />
        <h3 className="mt-3 font-heading text-xl font-bold text-teal">
          Referral Sent!
        </h3>
        <p className="mt-1.5 text-sm text-charcoal/70">
          We&apos;ve got the details and will take it from here. Your $20
          credit lands as soon as your friend&apos;s first cleanup is done.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block text-left sm:col-span-1">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Your Name
        </span>
        <input
          required
          value={form.yourName}
          onChange={(e) => setForm((f) => ({ ...f, yourName: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>
      <label className="block text-left sm:col-span-1">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Your Email
        </span>
        <input
          required
          type="email"
          value={form.yourEmail}
          onChange={(e) => setForm((f) => ({ ...f, yourEmail: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>
      <label className="block text-left sm:col-span-1">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Friend&apos;s Name
        </span>
        <input
          required
          value={form.friendName}
          onChange={(e) => setForm((f) => ({ ...f, friendName: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>
      <label className="block text-left sm:col-span-1">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Friend&apos;s Phone or Email
        </span>
        <input
          required
          value={form.friendContact}
          onChange={(e) => setForm((f) => ({ ...f, friendContact: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-full bg-coral px-6 py-3.5 font-heading text-lg font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] hover:bg-coral-dark active:scale-95 sm:col-span-2"
      >
        Send The Referral →
      </button>
    </form>
  );
}
