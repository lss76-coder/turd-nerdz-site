"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Mascot from "@/components/Mascot";
import {
  CONTACT_EMAIL,
  DEODORIZER_MONTHLY,
  calculateQuote,
  Frequency,
  isZipInServiceArea,
} from "@/lib/config";
import {
  IconBroom,
  IconCalendar,
  IconDog,
  IconHome,
  IconPin,
  IconTree,
} from "@/components/icons";
import { Sticker } from "@/components/Decor";
import { logLead } from "@/lib/sendLead";
import { isValidPhone, PHONE_ERROR, PHONE_PLACEHOLDER } from "@/lib/validate";

type YardSize = "regular" | "large";
type IconComponent = typeof IconDog;

const DOG_OPTIONS = [1, 2, 3, 4];

const FREQUENCY_OPTIONS: { value: Frequency; label: string; blurb: string; Icon: IconComponent }[] = [
  { value: "weekly", label: "Weekly", blurb: "Our most popular plan", Icon: IconCalendar },
  { value: "twiceWeekly", label: "Twice a Week", blurb: "For the messiest yards", Icon: IconCalendar },
  { value: "biweekly", label: "Biweekly", blurb: "Every other week", Icon: IconCalendar },
  { value: "monthly", label: "Monthly", blurb: "Once a month", Icon: IconCalendar },
  { value: "onetime", label: "One-Time Cleanup", blurb: "Just this once", Icon: IconBroom },
];

const YARD_OPTIONS: { value: YardSize; label: string; blurb: string; Icon: IconComponent }[] = [
  { value: "regular", label: "Regular House", blurb: "Typical residential lot", Icon: IconHome },
  { value: "large", label: "Large Property", blurb: "Over 1/8 acre yard", Icon: IconTree },
];

const TOTAL_STEPS = 4;

function quickDateOptions() {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  return [
    { value: tomorrow.toDateString(), label: `Tomorrow — ${fmt(tomorrow)}` },
    { value: dayAfter.toDateString(), label: fmt(dayAfter) },
  ];
}

const YARD_TYPE_OPTIONS = ["Mostly grass", "Mixed grass & turf", "Mostly turf, gravel, or hardscape"];
const DOG_SAFETY_OPTIONS = [
  "Dogs stay inside during our visit",
  "Dogs are outside but friendly with strangers",
  "Dogs are outside — please use extra caution",
];
const YARD_LOCATION_OPTIONS = [
  "Front yard",
  "Left side yard",
  "Right side yard",
  "Backyard only",
  "No gate — open access",
];
const TRASH_ACCESS_OPTIONS = [
  "Driveway",
  "Curb",
  "Side yard",
  "Garage",
  "Haul it away for us — we don't want to manage a bin",
];
const HOW_HEARD_OPTIONS = ["Google search", "Facebook or Nextdoor", "Referral from a friend", "Door hanger / flyer", "Other"];

export default function QuoteFlow({ zip }: { zip?: string }) {
  const [step, setStep] = useState(1);
  const [dogs, setDogs] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [yardSize, setYardSize] = useState<YardSize | null>(null);
  const [gatePhone, setGatePhone] = useState("");
  const [gatePhoneError, setGatePhoneError] = useState("");
  const [bookingPhoneError, setBookingPhoneError] = useState("");
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wantsDeodorizer, setWantsDeodorizer] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [hasGateCode, setHasGateCode] = useState<boolean | null>(null);
  const [hasCommunityCode, setHasCommunityCode] = useState<boolean | null>(null);
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    addressZip: zip ?? "",
    phone: "",
    email: "",
    yardType: "",
    dogSafety: "",
    gateLocation: "",
    trashLocation: "",
    gateCode: "",
    communityCode: "",
    dogNotes: "",
    howHeard: "",
    previousCustomer: false,
    agreeTerms: false,
  });

  const zipInArea = zip ? isZipInServiceArea(zip) : null;

  const quote = useMemo(() => {
    if (dogs == null || frequency == null) return null;
    return calculateQuote(dogs, frequency);
  }, [dogs, frequency]);

  const selectionsComplete = dogs != null && frequency != null && yardSize != null;
  const progressFilled = [dogs, frequency, yardSize, priceRevealed ? true : null].filter(
    (v) => v != null && v !== false
  ).length;

  function next() {
    setStep((s) => Math.min(s + 1, 3));
  }

  function reset() {
    setStep(1);
    setDogs(null);
    setFrequency(null);
    setYardSize(null);
    setGatePhone("");
    setGatePhoneError("");
    setBookingPhoneError("");
    setPriceRevealed(false);
    setSubmitted(false);
    setWantsDeodorizer(false);
    setStartDate("");
    setCustomDate("");
    setHasGateCode(null);
    setHasCommunityCode(null);
    setForm({
      name: "",
      street: "",
      city: "",
      addressZip: "",
      phone: "",
      email: "",
      yardType: "",
      dogSafety: "",
      gateLocation: "",
      trashLocation: "",
      gateCode: "",
      communityCode: "",
      dogNotes: "",
      howHeard: "",
      previousCustomer: false,
      agreeTerms: false,
    });
  }

  function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quote) return;
    if (!isValidPhone(gatePhone)) {
      setGatePhoneError(PHONE_ERROR);
      return;
    }
    setGatePhoneError("");
    setForm((f) => ({ ...f, phone: gatePhone }));
    const leadFields = {
      Phone: gatePhone,
      Dogs: dogs ?? "",
      Frequency: frequency ?? "",
      "Yard size": yardSize ?? "",
      ZIP: zip ?? "not provided",
    };
    logLead("Quote Leads", leadFields);
    setPriceRevealed(true);
  }

  const addonTotal = quote && !quote.isOneTime && wantsDeodorizer ? DEODORIZER_MONTHLY : 0;

  function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quote) return;
    if (!isValidPhone(form.phone)) {
      setBookingPhoneError(PHONE_ERROR);
      return;
    }
    setBookingPhoneError("");

    const priceLine = quote.isOneTime
      ? `One-time cleanup: $${quote.oneTime}`
      : `Estimated: $${quote.monthly + addonTotal}/month (${frequency}), first cleanup free`;

    const resolvedStartDate =
      startDate === "custom" ? customDate || "not specified" : startDate || "not specified";

    const contactInfo = {
      Name: form.name,
      Street: form.street,
      City: form.city,
      ZIP: form.addressZip,
      Phone: form.phone,
      Email: form.email,
    };
    const serviceDetails = {
      Dogs: dogs ?? "",
      Frequency: frequency ?? "",
      "Yard size": yardSize ?? "",
      "Preferred start date": resolvedStartDate,
      "Yard deodorizing add-on": wantsDeodorizer ? `Yes (+$${DEODORIZER_MONTHLY}/mo)` : "No",
      Price: priceLine,
    };
    const accessAndSafety = {
      "Yard type": form.yardType || "not specified",
      "Dog safety notes": form.dogSafety || "not specified",
      "Gate location": form.gateLocation || "not specified",
      "Trash can location": form.trashLocation || "not specified",
      "Gate code": hasGateCode ? form.gateCode || "yes, code not entered" : "No",
      "Community/entry code": hasCommunityCode ? form.communityCode || "yes, code not entered" : "No",
    };
    const other = {
      "Dog names, behavior & notes": form.dogNotes || "none provided",
      "How they heard about us": form.howHeard || "not specified",
      "Previous customer": form.previousCustomer ? "Yes" : "No",
    };

    logLead("Bookings", { ...contactInfo, ...serviceDetails, ...accessAndSafety, ...other });
    window.scrollTo(0, 0);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border-2 border-teal/10 bg-white p-8 text-center shadow-sm">
        <Mascot className="mx-auto h-20 w-20 animate-wiggle" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold text-teal">
          You&apos;re All Set!
        </h2>
        <p className="mt-2 text-charcoal/70">
          Your request has been submitted — we&apos;ll respond very quickly
          to confirm your first visit. Questions in the meantime? Reach us
          at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-coral">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          onClick={reset}
          className="mt-6 font-heading text-sm font-bold text-teal underline underline-offset-4 hover:text-coral"
        >
          Start a new quote
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {zipInArea === true && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border-2 border-green/30 bg-green/10 px-4 py-3 text-sm font-semibold text-green-dark">
          <IconPin className="h-5 w-5 shrink-0" /> Good news — {zip} is in our service area!
        </div>
      )}
      {zipInArea === false && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border-2 border-teal/15 bg-cream px-4 py-3 text-sm font-semibold text-teal">
          <IconPin className="h-5 w-5 shrink-0" /> We&apos;re not in {zip} quite yet, but
          we&apos;re expanding fast — get your estimate below and we&apos;ll
          reach out as soon as we are.
        </div>
      )}

      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < progressFilled ? "bg-coral" : "bg-teal/10"
            }`}
          />
        ))}
      </div>

      {step === 1 && !selectionsComplete && (
        <StepCard title="How many dogs?" subtitle="More dogs, more mess, we get it.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DOG_OPTIONS.map((n) => (
              <OptionCard
                key={n}
                selected={dogs === n}
                onClick={() => {
                  setDogs(n);
                  next();
                }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(n, 4) }).map((_, i) => (
                    <IconDog key={i} className="h-7 w-7 text-teal" />
                  ))}
                </div>
                <span className="mt-1 font-heading text-lg font-bold">
                  {n}
                  {n === 4 ? "+" : ""}
                </span>
              </OptionCard>
            ))}
          </div>
        </StepCard>
      )}

      {step === 2 && !selectionsComplete && (
        <StepCard
          title="How often should we come?"
          subtitle="Weekly keeps things tidiest — and it's our most popular plan."
          onBack={() => setStep(1)}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FREQUENCY_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={frequency === opt.value}
                onClick={() => {
                  setFrequency(opt.value);
                  next();
                }}
              >
                <opt.Icon className="h-8 w-8 text-teal" />
                <span className="mt-1 font-heading text-lg font-bold">{opt.label}</span>
                <span className="mt-0.5 text-xs text-charcoal/60">{opt.blurb}</span>
              </OptionCard>
            ))}
          </div>
        </StepCard>
      )}

      {step === 3 && !selectionsComplete && (
        <StepCard
          title="Roughly how big is your yard?"
          subtitle="Just a ballpark — we'll confirm on our first visit."
          onBack={() => setStep(2)}
        >
          <div className="grid grid-cols-2 gap-4">
            {YARD_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={yardSize === opt.value}
                onClick={() => setYardSize(opt.value)}
              >
                <opt.Icon className="h-8 w-8 text-teal" />
                <span className="mt-1 font-heading text-lg font-bold">{opt.label}</span>
                <span className="mt-0.5 text-xs text-charcoal/60">{opt.blurb}</span>
              </OptionCard>
            ))}
          </div>
        </StepCard>
      )}

      {selectionsComplete && !priceRevealed && (
        <StepCard
          title="Last step — what's your phone number?"
          subtitle="Enter it and your price shows up right here, instantly. If you don't finish booking, we may follow up by text so you don't lose your quote."
          onBack={() => setYardSize(null)}
        >
          <form onSubmit={handleGateSubmit} className="space-y-4">
            <Field
              label="Phone Number"
              type="tel"
              value={gatePhone}
              onChange={(v) => {
                setGatePhone(v);
                if (gatePhoneError) setGatePhoneError("");
              }}
              placeholder={PHONE_PLACEHOLDER}
              error={gatePhoneError}
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-coral px-6 py-3.5 font-heading text-lg font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] hover:bg-coral-dark active:scale-95"
            >
              See My Price →
            </button>
          </form>
        </StepCard>
      )}

      {priceRevealed && quote && (
        <div className="mt-8 rounded-3xl border-2 border-green/30 bg-green/10 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Mascot className="h-14 w-14 shrink-0" />
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-green-dark">
                Your Estimate
              </p>
              {quote.isOneTime ? (
                <p className="font-heading text-3xl font-extrabold text-teal">
                  ${quote.oneTime}{" "}
                  <span className="text-base font-semibold text-charcoal/60">flat</span>
                </p>
              ) : (
                <p className="font-heading text-3xl font-extrabold text-teal">
                  ${quote.monthly + addonTotal}
                  <span className="text-base font-semibold text-charcoal/60">/month</span>
                </p>
              )}
            </div>
          </div>

          {!quote.isOneTime && (
            <Sticker tone="coral" rotate={-2} className="mt-3">
              First cleanup&apos;s free
            </Sticker>
          )}
          {yardSize === "large" && (
            <p className="mt-2 text-xs text-charcoal/60">
              Extra-large or heavily wooded yards may see a small adjustment,
              confirmed before your first visit — never a surprise.
            </p>
          )}

          {!quote.isOneTime && (
            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border-2 border-teal/15 bg-white p-4">
              <input
                type="checkbox"
                checked={wantsDeodorizer}
                onChange={(e) => setWantsDeodorizer(e.target.checked)}
                className="mt-1 h-4 w-4 accent-coral"
              />
              <span className="text-sm">
                <span className="font-heading font-bold text-teal">
                  Add yard deodorizing — +${DEODORIZER_MONTHLY}/month
                </span>
                <br />
                <span className="text-charcoal/60">
                  Kennel-grade tool sanitizing is already included free on
                  every visit — this treats the yard itself.
                </span>
              </span>
            </label>
          )}

          <form onSubmit={handleBookingSubmit} className="mt-6 space-y-3">
            <h3 className="font-heading text-lg font-bold text-teal">
              Get Set Up &amp; Booked
            </h3>
            <p className="text-sm text-charcoal/60">
              A few more details and we&apos;ll get you on the schedule.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => {
                  setForm((f) => ({ ...f, phone: v }));
                  if (bookingPhoneError) setBookingPhoneError("");
                }}
                placeholder={PHONE_PLACEHOLDER}
                error={bookingPhoneError}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
                className="sm:col-span-2"
              />
              <Field
                label="Street Address"
                value={form.street}
                onChange={(v) => setForm((f) => ({ ...f, street: v }))}
                required
                className="sm:col-span-2"
              />
              <Field
                label="City"
                value={form.city}
                onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                required
              />
              <Field
                label="ZIP Code"
                value={form.addressZip}
                onChange={(v) => setForm((f) => ({ ...f, addressZip: v }))}
                required
              />
            </div>

            <div className="pt-2">
              <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
                Preferred Start Date
              </span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {quickDateOptions().map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStartDate(opt.value)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                      startDate === opt.value
                        ? "border-coral bg-coral/10 text-coral-dark"
                        : "border-teal/15 bg-white text-teal hover:border-coral/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setStartDate("custom")}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    startDate === "custom"
                      ? "border-coral bg-coral/10 text-coral-dark"
                      : "border-teal/15 bg-white text-teal hover:border-coral/50"
                  }`}
                >
                  Another date
                </button>
              </div>
              {startDate === "custom" && (
                <input
                  type="date"
                  required
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 text-base outline-none focus:border-coral"
                />
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                label="Is your yard mostly grass or turf?"
                value={form.yardType}
                onChange={(v) => setForm((f) => ({ ...f, yardType: v }))}
                options={YARD_TYPE_OPTIONS}
                required
              />
              <Select
                label="Dogs in the yard during our visit?"
                value={form.dogSafety}
                onChange={(v) => setForm((f) => ({ ...f, dogSafety: v }))}
                options={DOG_SAFETY_OPTIONS}
                required
              />
            </div>

            <p className="pt-1 text-xs text-charcoal/50">
              For the next two, answer as if you&apos;re standing at the street looking at your house.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                label="Where is your gate located?"
                value={form.gateLocation}
                onChange={(v) => setForm((f) => ({ ...f, gateLocation: v }))}
                options={YARD_LOCATION_OPTIONS}
                required
              />
              <Select
                label="Where is your trash can located?"
                value={form.trashLocation}
                onChange={(v) => setForm((f) => ({ ...f, trashLocation: v }))}
                options={TRASH_ACCESS_OPTIONS}
                required
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <YesNo
                label="Gate code?"
                value={hasGateCode}
                onChange={setHasGateCode}
              />
              <YesNo
                label="Community / entry code?"
                value={hasCommunityCode}
                onChange={setHasCommunityCode}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {hasGateCode && (
                <Field
                  label="Gate Code"
                  value={form.gateCode}
                  onChange={(v) => setForm((f) => ({ ...f, gateCode: v }))}
                />
              )}
              {hasCommunityCode && (
                <Field
                  label="Community Code"
                  value={form.communityCode}
                  onChange={(v) => setForm((f) => ({ ...f, communityCode: v }))}
                />
              )}
            </div>

            <TextAreaField
              label="Dog Name(s), Behavior & Anything Else We Should Know"
              value={form.dogNotes}
              onChange={(v) => setForm((f) => ({ ...f, dogNotes: v }))}
              placeholder="e.g. Biscuit and Nala, friendly but loud barkers, keep the side gate latched"
            />

            <Select
              label="How did you hear about us?"
              value={form.howHeard}
              onChange={(v) => setForm((f) => ({ ...f, howHeard: v }))}
              options={HOW_HEARD_OPTIONS}
            />

            <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm text-charcoal/75">
              <input
                type="checkbox"
                checked={form.previousCustomer}
                onChange={(e) => setForm((f) => ({ ...f, previousCustomer: e.target.checked }))}
                className="mt-0.5 h-4 w-4 accent-coral"
              />
              Have you used a pet waste removal service before?
            </label>

            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-charcoal/75">
              <input
                type="checkbox"
                required
                checked={form.agreeTerms}
                onChange={(e) => setForm((f) => ({ ...f, agreeTerms: e.target.checked }))}
                className="mt-0.5 h-4 w-4 accent-coral"
              />
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-teal underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-teal underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-coral px-6 py-3.5 font-heading text-lg font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-[1.02] hover:bg-coral-dark active:scale-95"
            >
              Sign Me Up →
            </button>
            <p className="text-center text-xs text-charcoal/50">
              No payment required now. We&apos;ll confirm details and get you
              scheduled.
            </p>
          </form>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-charcoal/50">
        Prefer to talk it through?{" "}
        <Link href="/contact" className="font-semibold text-teal underline underline-offset-4">
          Contact us directly
        </Link>
        .
      </p>
    </div>
  );
}

function StepCard({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-1 font-heading text-sm font-semibold text-teal hover:text-coral"
        >
          ← Back
        </button>
      )}
      <h2 className="font-heading text-2xl font-extrabold text-teal sm:text-3xl">{title}</h2>
      <p className="mt-1 text-charcoal/70">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[110px] flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all active:scale-95 ${
        selected
          ? "border-coral bg-coral/10 shadow-md"
          : "border-teal/15 bg-white hover:border-coral/50"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className = "",
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base outline-none focus:border-coral ${
          error ? "border-coral" : "border-teal/15"
        }`}
      />
      {error && <p className="mt-1 text-sm font-semibold text-coral">{error}</p>}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-left">
      <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
        {label}
      </span>
      <textarea
        rows={2}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 text-base outline-none focus:border-coral"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block text-left">
      <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
        {label}
      </span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border-2 border-teal/15 bg-white px-4 py-2.5 text-base outline-none focus:border-coral"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="block text-left">
      <span className="font-heading text-xs font-bold uppercase tracking-wide text-teal">
        {label}
      </span>
      <div className="mt-1 flex gap-2">
        {[
          { label: "Yes", val: true },
          { label: "No", val: false },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition-colors ${
              value === opt.val
                ? "border-coral bg-coral/10 text-coral-dark"
                : "border-teal/15 bg-white text-teal hover:border-coral/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
