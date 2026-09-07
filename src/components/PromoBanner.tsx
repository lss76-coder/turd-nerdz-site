"use client";

import { useEffect, useState } from "react";
import { PROMO_DISCOUNT, PROMO_ENABLED, PROMO_MONTHS, PROMO_TOTAL_SPOTS } from "@/lib/config";
import { fetchPromoSpotsLeft } from "@/lib/promo";

// Live "X spots left" banner for the launch promo. Starts optimistic
// (assumes every spot is open) and corrects itself once the real count
// comes back from the Sheet, so there's no layout jump on slow connections.
// Hides itself entirely once spots run out or the promo is turned off.
export default function PromoBanner({ className = "" }: { className?: string }) {
  const [spotsLeft, setSpotsLeft] = useState<number>(PROMO_TOTAL_SPOTS);

  useEffect(() => {
    let cancelled = false;
    fetchPromoSpotsLeft().then((left) => {
      if (!cancelled && left !== null) setSpotsLeft(left);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!PROMO_ENABLED || spotsLeft <= 0) return null;

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border-2 border-coral bg-coral/10 px-4 py-2 text-center font-heading text-sm font-bold text-coral-dark sm:text-base ${className}`}
    >
      <span>🔥 {PROMO_DISCOUNT * 100}% off your first {PROMO_MONTHS} months</span>
      <span className="text-coral/50">·</span>
      <span>only {spotsLeft} of {PROMO_TOTAL_SPOTS} spots left</span>
    </div>
  );
}
