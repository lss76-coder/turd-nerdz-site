// Site-wide config and business logic constants.

export const BUSINESS_NAME = "The Turd Nerdz";
export const TAGLINE = "No Turd Left Behind.";
export const SERVICE_AREA = "Bluewater Bay & Niceville, FL";
export const PHONE_DISPLAY = "(850) 733-7118";
export const PHONE_TEL = "+18507337118";
export const CONTACT_EMAIL = "info@theturdnerdz.com";

export const SITE_URL = "https://theturdnerdz.com";

// TODO: swap this for the CRM booking link once we sign up for one (e.g. Sweep&Go / Jobber).
// Until then, the "Sign Up" CTAs route to our own quote -> contact form flow below.
export const CRM_BOOKING_URL: string | null = null;

// Real pricing matrix. Weekly is the base rate; every other frequency is a
// multiplier off it, applied to the whole (dogs-adjusted) subtotal:
//   biweekly    = weekly × 0.75
//   monthly     = biweekly × 0.75  (= weekly × 0.5625)
//   twiceWeekly = weekly × 2, minus 10%  (= weekly × 1.8)
export const PRICING = {
  weeklyBase: 79, // 1 dog, weekly
  perDogWeekly: 10, // per additional dog, at the weekly rate — scaled by the same frequency multiplier below
  oneTimeCleanup: 69, // flat
  firstCleanupFree: true,
} as const;

export const FREQUENCY_MULTIPLIERS = {
  weekly: 1,
  biweekly: 0.75,
  monthly: 0.75 * 0.75,
  twiceWeekly: 2 * 0.9,
} as const;

// Refer a Friend: both sides get this amount.
export const REFERRAL_CREDIT = 20;

// Launch promo: 50% off for the first few months, limited to a fixed number
// of new customers. The Google Apps Script webhook (google-apps-script/leads.gs)
// is the source of truth for how many spots are actually claimed — this
// PROMO_TOTAL_SPOTS value must match PROMO_TOTAL_SPOTS in that file, since
// it's what the script uses to decide when to stop honoring the deal.
export const PROMO_ENABLED = true;
export const PROMO_TOTAL_SPOTS = 10;
export const PROMO_MONTHS = 3;
export const PROMO_DISCOUNT = 0.5;

// Tool/shoe sanitizing between every yard (kennel-grade disinfectant) is
// always included — never an add-on. Yard deodorizing is the paid add-on.
export const DEODORIZER_MONTHLY = 10;

// ZIP codes currently covering Bluewater Bay & Niceville, FL.
export const SERVICE_ZIPS = ["32578", "32579"];

export function isZipInServiceArea(zip: string) {
  return SERVICE_ZIPS.includes(zip.trim());
}

export type Frequency = "weekly" | "biweekly" | "monthly" | "twiceWeekly" | "onetime";

export function calculateQuote(dogs: number, frequency: Frequency) {
  if (frequency === "onetime") {
    return { monthly: 0, oneTime: PRICING.oneTimeCleanup, isOneTime: true };
  }

  const extraDogs = Math.max(0, dogs - 1);
  const weeklyEquivalent = PRICING.weeklyBase + extraDogs * PRICING.perDogWeekly;
  const monthly = Math.round(weeklyEquivalent * FREQUENCY_MULTIPLIERS[frequency]);

  return { monthly, oneTime: 0, isOneTime: false };
}
