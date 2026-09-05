import type { AccordionItem } from "@/components/Accordion";
import { DEODORIZER_MONTHLY } from "./config";

export const FAQ_CATEGORIES: { title: string; items: AccordionItem[] }[] = [
  {
    title: "Service Area & Scheduling",
    items: [
      {
        question: "What areas do you serve?",
        answer:
          "We're currently serving Bluewater Bay and Niceville, FL — including neighborhoods around Rocky Bayou, Bayou Bend, Toqua Golf & Country Club, and the streets closer to Highway 20. We're expanding block by block, so if you're just outside our current zone, enter your ZIP on the quote page and we'll reach out the moment we cover your street.",
      },
      {
        question: "What if it rains on my scheduled day?",
        answer:
          "We still come. Light rain doesn't stop us — a clean yard matters just as much on a wet day. During severe weather (lightning, tropical storm conditions), we'll reschedule your visit for the next safe day and text you so you're never left wondering.",
      },
      {
        question: "Do I need to be home during service?",
        answer:
          "Nope. Most of our customers aren't home when we scoop — that's kind of the point. Just let us know how to access your yard (gate code, side gate latch, etc.) during signup, and we'll text you a photo when we're done.",
      },
      {
        question: "How do I get my gate code or access instructions to you?",
        answer:
          "You'll add access notes right in your signup form. If anything changes later — new gate code, a dog that's recently gotten more excitable, a new fence — just text or email us and we'll update your file before your next visit.",
      },
    ],
  },
  {
    title: "Service Details",
    items: [
      {
        question: "How do you dispose of the waste?",
        answer:
          "We bag everything on-site in a strong, sealed bag and either leave it in your own trash can for your regular pickup, or haul it away with us — whichever you prefer. Either way, it's sealed up and never left loose in your yard.",
      },
      {
        question: "Do you offer one-time cleanups?",
        answer:
          "Yes. If your yard has gotten away from you (we don't judge — it happens), our one-time Yard Reset is a flat $69 deep cleanup. Sign up for a recurring plan at the same time and we'll knock the one-time fee down.",
      },
      {
        question: "Will you disturb my landscaping or sprinkler heads?",
        answer:
          "We're careful. Our technicians walk every yard methodically and know to watch for sprinkler heads, garden beds, and anything fragile. If you have something specific you want us to avoid, flag it in your account notes.",
      },
      {
        question: "What if I have more than one dog, or a puppy who's still learning?",
        answer:
          "More dogs just means a small add-on to your monthly price — no separate visits needed. And yes, puppies count; we'll scoop wherever the mess actually is, not just where a fully trained dog would go.",
      },
    ],
  },
  {
    title: "Pricing & Billing",
    items: [
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes — genuinely anytime, no fees, no phone call required to \"retain\" you. Pause for vacation, skip a week, or cancel outright. We'd rather earn your business every visit than lock you into a contract.",
      },
      {
        question: "Is the first cleanup really free?",
        answer:
          "Really free. Sign up for any recurring plan (weekly or biweekly) and your first visit — which is usually the messiest one if it's been a while — doesn't cost you anything.",
      },
      {
        question: "How does billing work?",
        answer:
          "Right now, billing is handled directly — no auto-charge surprises. Once we roll out our client portal, you'll be able to manage payment, see your service history, and update your plan online. Until then, we'll keep it simple and personal.",
      },
      {
        question: "How much is yard deodorizing?",
        answer: `Yard deodorizing is an optional add-on for $${DEODORIZER_MONTHLY}/month on top of any recurring plan. It's separate from tool sanitizing, which is always included free — deodorizing treats your lawn itself, not just our equipment.`,
      },
    ],
  },
  {
    title: "Pets & Safety",
    items: [
      {
        question: "Is your equipment safe for pets?",
        answer:
          "Yes. We disinfect our tools and shoes with a kennel-grade sanitizer after every yard we visit — included on every plan, no extra charge — so nothing gets tracked between properties. Our optional yard deodorizing add-on also uses pet-safe, EPA-approved products.",
      },
      {
        question: "My dog is anxious around strangers — is that a problem?",
        answer:
          "Not at all, as long as your dog is secured (inside, in a separate area of the yard, or on a run) during our visit for everyone's safety. Let us know in your notes and we'll always double-check the gate is latched when we leave.",
      },
    ],
  },
];
