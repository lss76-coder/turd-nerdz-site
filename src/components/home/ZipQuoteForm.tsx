"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ZipQuoteForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setError("Enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    router.push(`/quote?zip=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-2 sm:flex-row ${compact ? "" : "sm:gap-3"}`}
    >
      <div className="flex-1">
        <label htmlFor="hero-zip" className="sr-only">
          ZIP code
        </label>
        <input
          id="hero-zip"
          inputMode="numeric"
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full rounded-full border-2 border-teal/20 bg-white px-5 py-3.5 text-base outline-none focus:border-coral"
        />
        {error && <p className="mt-1 pl-2 text-left text-sm text-coral-dark">{error}</p>}
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-coral px-7 py-3.5 font-heading text-base font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] hover:bg-coral-dark active:scale-95"
      >
        Free Quote →
      </button>
    </form>
  );
}
