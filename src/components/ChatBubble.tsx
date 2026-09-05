"use client";

import { useState } from "react";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";
import { IconPaw } from "./icons";

// A lightweight "chat" bubble — no live chat backend exists, so it opens a
// small menu of real ways to reach a person (text, call, email) instead of
// pretending to be an AI chat window.
export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-64 rounded-2xl border-2 border-teal/10 bg-white p-4 shadow-2xl">
          <p className="font-heading text-sm font-bold text-teal">
            Talk to a real person
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={`sms:${PHONE_TEL}`}
              className="rounded-xl bg-cream px-3 py-2.5 text-sm font-semibold text-teal hover:bg-cream-dark"
            >
              💬 Text us — {PHONE_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="rounded-xl bg-cream px-3 py-2.5 text-sm font-semibold text-teal hover:bg-cream-dark"
            >
              📞 Call us — {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-xl bg-cream px-3 py-2.5 text-sm font-semibold text-teal hover:bg-cream-dark"
            >
              ✉️ Email us
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/40 transition-transform hover:scale-105 active:scale-95"
      >
        <IconPaw className="h-6 w-6" />
      </button>
    </div>
  );
}
