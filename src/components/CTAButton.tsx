import Link from "next/link";
import { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold transition-transform duration-150 active:scale-95 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

  const variants: Record<string, string> = {
    primary: "bg-coral text-white shadow-lg shadow-coral/30 hover:bg-coral-dark",
    secondary: "bg-green text-white shadow-lg shadow-green/30 hover:bg-green-dark",
    ghost: "bg-transparent text-teal border-2 border-teal hover:bg-teal hover:text-cream",
  };

  const sizes: Record<string, string> = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}
