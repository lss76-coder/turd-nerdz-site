"use client";

import { useEffect, useRef, useState } from "react";
import { STOCK_VIDEO_URL } from "@/lib/stockMedia";

const SEEN_KEY = "turdnerdz_intro_seen";

// A full-screen video overlay that covers the entire homepage the first
// time someone lands on it in a given browser session — dismisses itself
// once the clip finishes, on click, or via the skip button. Only ever
// shows once per session (tracked in sessionStorage) so repeat visits and
// internal navigation don't get interrupted every time.
export default function IntroVideoOverlay() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reads a browser-only API (sessionStorage) to decide whether to show
    // the overlay — this can only happen after mount, so a single setState
    // here is the standard, unavoidable pattern for syncing with it.
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
    } catch {
      seen = false;
    }
    if (!seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setClosing(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore — private browsing etc, just won't persist across tabs
    }
    setTimeout(() => setVisible(false), 400);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-400 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Intro video"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
      >
        <source src={STOCK_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-charcoal/30" />

      <div className="relative flex flex-col items-center gap-6 px-4 text-center text-cream">
        <span className="font-heading text-4xl font-extrabold text-logo-green drop-shadow-lg sm:text-6xl">
          The Turd Nerdz
        </span>
        <span className="font-heading text-lg font-bold text-coral drop-shadow-lg sm:text-2xl">
          No Turd Left Behind.
        </span>
      </div>

      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-6 right-6 rounded-full bg-cream/90 px-5 py-2.5 font-heading text-sm font-bold text-teal shadow-lg backdrop-blur transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      >
        Skip →
      </button>
    </div>
  );
}
