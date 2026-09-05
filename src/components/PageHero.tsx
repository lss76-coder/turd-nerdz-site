import { ReactNode } from "react";
import { PawScatter } from "./Decor";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-teal py-14 text-center text-cream sm:py-16">
      <PawScatter className="text-cream" />
      <div className="relative mx-auto max-w-3xl px-4">
        {eyebrow && (
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-coral">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 font-heading text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-cream/85">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
