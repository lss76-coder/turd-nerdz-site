"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// A pill-shaped tab pinned to the left edge of the viewport, always
// visible — common pattern on pro service sites (pest control, lawn care,
// including swoopscoop.com) so the primary CTA is never more than one
// click away, no matter how far down the page someone has scrolled. Plain
// horizontal, centered text — easier to read at a glance than sideways
// rotated text — sized down on mobile so it stays a small tab rather than
// eating into a small screen. Hides itself once the footer scrolls into
// view so it doesn't sit on top of the footer's own logo/contact info,
// and hides entirely on the quote flow itself since it would just point
// back at the page the visitor is already on.
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
      className={`fixed left-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-1.5 rounded-r-full bg-coral py-2.5 pl-3.5 pr-3 shadow-lg shadow-coral/40 transition-all hover:scale-105 hover:pr-4 active:scale-95 sm:gap-2 sm:py-3.5 sm:pl-5 sm:pr-4 sm:hover:pr-5 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-heading text-xs font-bold tracking-wide text-white sm:text-base">
        Free Quote
      </span>
      <span className="text-xs font-bold text-white sm:text-base" aria-hidden>
        →
      </span>
    </Link>
  );
}
