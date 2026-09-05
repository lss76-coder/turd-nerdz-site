"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// A slim vertical tab pinned to the left edge of the viewport, sideways
// text sticking out (not a big pill), visible on both desktop and mobile.
// Hides itself once the footer scrolls into view so it doesn't sit on top
// of the footer's own logo/contact info, and hides entirely on the quote
// flow itself since it would just point back at the page the visitor is
// already on.
export default function SideQuoteTab() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (pathname?.startsWith("/quote")) return null;

  return (
    <Link
      href="/quote"
      className={`fixed left-0 top-1/2 z-40 -translate-y-1/2 rounded-r-lg bg-coral px-2.5 py-6 shadow-lg shadow-coral/40 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:py-8 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-heading whitespace-nowrap text-sm font-bold tracking-wide text-white [writing-mode:vertical-rl] sm:text-base">
        Free Quote
      </span>
    </Link>
  );
}
