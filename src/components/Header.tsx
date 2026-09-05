"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/why-us", label: "Why Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/locations", label: "Areas" },
  { href: "/refer-a-friend", label: "Refer a Friend" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/portal", label: "Client Portal" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`z-50 border-b-2 border-teal/10 bg-cream/95 backdrop-blur ${
        open ? "fixed inset-0 flex flex-col" : "sticky top-0"
      }`}
    >
      <div className="mx-auto flex w-full shrink-0 max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-v2-192.png"
            alt="The Turd Nerdz logo"
            width={96}
            height={96}
            className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
            priority
          />
          <span className="font-heading text-xl font-extrabold text-logo-green sm:text-2xl">
            The Turd Nerdz
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-semibold text-charcoal hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full border-2 border-teal px-4 py-2.5 font-heading text-sm font-bold text-teal hover:bg-teal hover:text-cream"
          >
            {PHONE_DISPLAY}
          </a>
          <CTAButton href="/quote" size="md">
            Free Quote
          </CTAButton>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-teal text-teal xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="flex-1 overflow-y-auto border-t-2 border-teal/10 bg-cream px-4 pb-6 pt-2 xl:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-heading text-base font-semibold text-charcoal hover:bg-cream-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-2 block rounded-full border-2 border-teal px-4 py-3 text-center font-heading text-base font-bold text-teal"
          >
            {PHONE_DISPLAY}
          </a>
          <CTAButton href="/quote" size="lg" className="mt-3 w-full">
            Free Quote
          </CTAButton>
        </div>
      )}
    </header>
  );
}
