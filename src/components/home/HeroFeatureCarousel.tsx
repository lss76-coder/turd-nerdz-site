"use client";

import { useEffect, useState } from "react";
import { IconCalendar, IconCamera, IconHandshake } from "@/components/icons";

const SLIDES = [
  {
    Icon: IconCalendar,
    title: "Recurring pet waste removal",
    desc: "Sign up for weekly or biweekly cleanings. Pick the schedule that fits your yard.",
  },
  {
    Icon: IconCamera,
    title: "Photo proof, every visit",
    desc: "We text a photo of the gate latched shut after every visit, so you always know your dog and yard are secure.",
  },
  {
    Icon: IconHandshake,
    title: "No contracts, ever",
    desc: "Pause, skip, or cancel whenever life happens. You're never locked in.",
  },
];

export default function HeroFeatureCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="mt-8 flex items-start gap-4 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-4 text-left">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-teal">
        <slide.Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-heading text-base font-bold text-teal">{slide.title}</p>
        <p className="mt-0.5 text-sm text-charcoal/70">{slide.desc}</p>
        <div className="mt-3 flex gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-coral" : "bg-teal/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
