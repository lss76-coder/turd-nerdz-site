import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";
import { LOCATIONS } from "@/lib/locations";

export default function Footer() {
  return (
    <footer className="grain border-t-2 border-teal/10 bg-teal text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-v2-192.png"
              alt="The Turd Nerdz logo"
              width={128}
              height={128}
              className="h-16 w-16 shrink-0"
            />
            <span className="font-heading text-xl font-extrabold text-logo-green">The Turd Nerdz</span>
          </div>
          <p className="mt-3 text-sm text-cream/80">No Turd Left Behind.</p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-coral">
            Get Around
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/quote" className="hover:text-coral">Instant Quote</Link></li>
            <li><Link href="/services" className="hover:text-coral">Services</Link></li>
            <li><Link href="/why-us" className="hover:text-coral">Why Us</Link></li>
            <li><Link href="/pricing" className="hover:text-coral">Pricing</Link></li>
            <li><Link href="/refer-a-friend" className="hover:text-coral">Refer a Friend</Link></li>
            <li><Link href="/blog" className="hover:text-coral">Blog</Link></li>
            <li><Link href="/about" className="hover:text-coral">About</Link></li>
            <li><Link href="/faq" className="hover:text-coral">FAQ</Link></li>
            <li><Link href="/portal" className="hover:text-coral">Client Portal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-coral">
            Service Areas
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <Link href={`/locations/${loc.slug}`} className="hover:text-coral">
                  {loc.name}, {loc.state}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-coral">{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-coral">{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-coral">
            Ready?
          </h3>
          <p className="mt-3 text-sm text-cream/80">
            First cleanup free with any new recurring plan.
          </p>
          <Link
            href="/quote"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-coral px-5 py-2.5 font-heading text-sm font-bold text-white hover:bg-coral-dark"
          >
            Get Instant Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} The Turd Nerdz. Locally run in Bluewater Bay, FL.
      </div>
    </footer>
  );
}
