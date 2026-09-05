"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/config";
import { logLead } from "@/lib/sendLead";
import { buildEmailBody } from "@/lib/formatEmail";
import { sendEmail } from "@/lib/sendEmail";
import { isValidPhone, PHONE_ERROR, PHONE_PLACEHOLDER } from "@/lib/validate";
import Mascot from "@/components/Mascot";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.phone && !isValidPhone(form.phone)) {
      setPhoneError(PHONE_ERROR);
      return;
    }
    setPhoneError("");

    const body = buildEmailBody("New message from theturdnerdz.com/contact.", [
      {
        title: "CONTACT INFO",
        fields: { Name: form.name, Email: form.email, Phone: form.phone || "not provided" },
      },
      { title: "MESSAGE", raw: form.message },
    ]);

    logLead("Contact Messages", {
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      Message: form.message,
    });

    const emailed = await sendEmail("Website Contact - " + form.name, body);
    if (!emailed) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Website Contact - " + form.name
      )}&body=${encodeURIComponent(body)}`;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-green/30 bg-green/10 p-8 text-center">
        <Mascot className="mx-auto h-16 w-16 animate-wiggle" />
        <h3 className="mt-3 font-heading text-xl font-bold text-teal">Message Sent!</h3>
        <p className="mt-1.5 text-sm text-charcoal/70">
          We&apos;ve got your message and will get back to you fast, usually
          same day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
            Name
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
          />
        </label>
        <label className="block text-left">
          <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
            Phone
          </span>
          <input
            type="tel"
            value={form.phone}
            placeholder={PHONE_PLACEHOLDER}
            onChange={(e) => {
              setForm((f) => ({ ...f, phone: e.target.value }));
              if (phoneError) setPhoneError("");
            }}
            className={`mt-1 w-full rounded-xl border-2 bg-white px-4 py-2.5 outline-none focus:border-coral ${
              phoneError ? "border-coral" : "border-teal/15"
            }`}
          />
          {phoneError && <p className="mt-1 text-sm font-semibold text-coral">{phoneError}</p>}
        </label>
      </div>
      <label className="block text-left">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Email
        </span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>
      <label className="block text-left">
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
          Message
        </span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 outline-none focus:border-coral"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded-full bg-coral px-6 py-3.5 font-heading text-lg font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] hover:bg-coral-dark active:scale-95"
      >
        Send Message →
      </button>
    </form>
  );
}
