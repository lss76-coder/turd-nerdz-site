import type { Metadata } from "next";
import { Luckiest_Guy, Sora, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideQuoteTab from "@/components/SideQuoteTab";
import ChatBubble from "@/components/ChatBubble";
import JsonLd from "@/components/JsonLd";
import { CONTACT_EMAIL, PHONE_TEL, SITE_URL } from "@/lib/config";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: ["400"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

const TITLE = "The Turd Nerdz | Dog Poop Pickup in Bluewater Bay & Niceville, FL";
const DESCRIPTION =
  "Weekly and biweekly dog waste removal for Bluewater Bay & Niceville, FL. No contracts, photo proof every visit, first cleanup free. Get an instant quote in 30 seconds.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | The Turd Nerdz",
  },
  description: DESCRIPTION,
  keywords: [
    "dog poop pickup Bluewater Bay",
    "pet waste removal Niceville FL",
    "dog waste removal service",
    "pooper scooper Bluewater Bay",
    "pet waste removal Okaloosa County",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Turd Nerdz",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Turd Nerdz",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: CONTACT_EMAIL,
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Bluewater Bay, FL" },
    { "@type": "City", name: "Niceville, FL" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Niceville",
    addressRegion: "FL",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${luckiestGuy.variable} ${sora.variable} ${permanentMarker.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <SideQuoteTab />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBubble />
      </body>
    </html>
  );
}
