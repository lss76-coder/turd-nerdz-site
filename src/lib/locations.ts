export type LocationFaq = { question: string; answer: string };

export type Location = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  intro: string[];
  neighborhoods: string[];
  landmarks: string[];
  sections: { title: string; body: string[] }[];
  faq: LocationFaq[];
  keywords: string[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "bluewater-bay",
    name: "Bluewater Bay",
    state: "FL",
    headline: "Dog Poop Pickup & Pet Waste Removal in Bluewater Bay, FL",
    keywords: [
      "dog poop pickup Bluewater Bay",
      "pet waste removal Bluewater Bay FL",
      "dog waste service Bluewater Bay",
      "pooper scooper Bluewater Bay",
    ],
    intro: [
      "Bluewater Bay is our home base — literally the neighborhood The Turd Nerdz started in. If you live along Rocky Bayou, near Toqua Golf & Country Club, or anywhere in the mix of waterfront and inland streets that make up this community, we're already working your area.",
      "Bluewater Bay's mix of golf-course lots, bayou-front properties, and family neighborhoods means yards here come in every shape and size — and dogs here get a lot of yard time to match. That's great for your dog and rough on your grass if nobody's keeping up with cleanup.",
    ],
    neighborhoods: [
      "Rocky Bayou",
      "Bayou Bend",
      "Toqua Golf & Country Club area",
      "Marina District",
      "Behind the schools along Highway 20",
    ],
    landmarks: [
      "Rocky Bayou State Park",
      "Toqua Golf & Country Club",
      "Bluewater Bay Marina",
      "Bluewater Elementary & Middle Schools",
    ],
    sections: [
      {
        title: "Why Bluewater Bay Yards Need More Than Occasional Cleanup",
        body: [
          "Bluewater Bay's humidity and regular rainfall mean waste breaks down and spreads bacteria faster here than in drier climates — which is part of why we lean toward weekly service as the default recommendation for most households, especially multi-dog homes.",
          "Waterfront and bayou-adjacent lots also tend to have thicker grass and more shaded, damp areas where waste can hide from a quick glance — exactly the spots a thorough weekly scoop catches that a rushed once-a-month cleanup misses.",
        ],
      },
      {
        title: "What Service Looks Like In Your Neighborhood",
        body: [
          "Because we're based here, we already know the general layout of Bluewater Bay's gated sections, HOA common areas, and the handful of streets that only have side-yard access — which means faster, more efficient visits than a company routing in from outside the area.",
          "Every visit gets a full walkthrough of your yard, not just the obvious spots, and you'll get a text with a photo the moment we're done — so you know exactly when your yard is safe to send the kids or the dog back out into.",
        ],
      },
    ],
    faq: [
      {
        question: "Do you service the gated sections of Bluewater Bay?",
        answer:
          "Yes — just include your gate code or access instructions when you sign up, and we'll take it from there.",
      },
      {
        question: "How fast can I get started in Bluewater Bay?",
        answer:
          "Since this is our home neighborhood, we can usually get new Bluewater Bay customers scheduled within the same week.",
      },
    ],
  },
  {
    slug: "niceville",
    name: "Niceville",
    state: "FL",
    headline: "Pet Waste Removal & Dog Poop Scooping in Niceville, FL",
    keywords: [
      "pet waste removal Niceville FL",
      "dog poop scooping Niceville",
      "dog waste removal service Niceville FL",
      "Okaloosa County pooper scooper",
    ],
    intro: [
      "Niceville is a short drive from our home base in Bluewater Bay, and it's one of the fastest-growing parts of our service area. Close to Eglin Air Force Base and Choctawhatchee Bay, Niceville is a genuinely walkable, family-oriented town — which means a lot of yards, a lot of dogs, and a lot of households who'd rather spend their weekend doing anything other than scooping.",
      "Whether you're near Rocky Bayou, closer to downtown Niceville, or out toward the areas bordering Eglin, we're expanding coverage across town and would love to get your street added to the route.",
    ],
    neighborhoods: [
      "Downtown Niceville",
      "Rocky Bayou area",
      "Palm Boulevard corridor",
      "Areas near John Sims Parkway",
      "Neighborhoods bordering Eglin AFB",
    ],
    landmarks: [
      "Choctawhatchee Bay",
      "Eglin Air Force Base",
      "Niceville High School",
      "John C. Beasley State Park",
    ],
    sections: [
      {
        title: "Niceville's Climate Means More Frequent Cleanup Pays Off",
        body: [
          "Like the rest of Okaloosa County, Niceville sees regular afternoon thunderstorms through spring and summer. Waste sitting through repeated rain cycles spreads bacteria across your lawn faster than in a dry climate, which is why we generally recommend weekly service over biweekly for Niceville households with more than one dog.",
          "The upside of Niceville's climate is a longer growing season for your lawn — which also means grass damaged by nitrogen-heavy waste buildup has more time each year to actually recover, as long as the buildup gets cleared before it kills the grass outright.",
        ],
      },
      {
        title: "Expanding Coverage Across Niceville",
        body: [
          "We're adding new Niceville streets to our route regularly. If you're just outside our current coverage, enter your ZIP code on our instant quote page — we track every request and prioritize expansion based on where demand is highest.",
          "Once you're in our service zone, onboarding is simple: pick your plan, tell us how to access your yard, and we'll have you on the schedule within days, not weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "Is my part of Niceville covered yet?",
        answer:
          "Coverage is expanding regularly. Enter your ZIP on the quote page to check instantly, and if you're not covered yet, we'll reach out the moment we are.",
      },
      {
        question: "Do you offer one-time cleanups for Niceville rentals?",
        answer:
          "Yes — we offer one-time Yard Reset cleanups, which are popular for Niceville rental turnovers and pre-listing home cleanups near Eglin.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}
