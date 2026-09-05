"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// A vertical tab pinned to the left edge of the viewport, always visible —
// common pattern on pro service sites (pest control, lawn care) so the
// primary CTA is never more than one click away, no matter how far down
// the page someone has scrolled. Hides itself once the footer scrolls into
// view so it doesn't sit on top of the footer's own logo/contact info, and
// hides entirely on the quote flow itself since it would just point back
// at the page the visitor is already on.
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
      className={`fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-r-xl bg-coral px-3.5 py-7 shadow-lg shadow-coral/30 transition-all hover:px-5 sm:block ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span
        className="font-heading text-base font-bold tracking-wider text-white [writing-mode:vertical-rl]"
        style={{ transform: "rotate(180deg)" }}
      >
        Free Quote&nbsp;&nbsp;→
      </span>
    </Link>
  );
}
