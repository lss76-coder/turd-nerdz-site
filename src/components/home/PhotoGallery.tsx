import { STOCK_DOG_PHOTOS, STOCK_RUNNING_DOG_PHOTO_URL } from "@/lib/stockMedia";
import ScrollReveal from "@/components/ScrollReveal";

const PHOTOS = [
  { src: STOCK_RUNNING_DOG_PHOTO_URL, caption: "Every Yard" },
  { src: STOCK_DOG_PHOTOS.happyDog, caption: "Every Dog" },
  { src: STOCK_DOG_PHOTOS.puppyCloseup, caption: "Every Visit" },
  { src: STOCK_DOG_PHOTOS.cutePuppy, caption: "Every Time" },
];

export default function PhotoGallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <ScrollReveal>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
            Real Dogs, Real Yards
          </h2>
          <p className="mt-2 text-charcoal/70">
            A few of our favorite yards and faces.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PHOTOS.map((photo, i) => (
          <ScrollReveal key={photo.caption} direction="scale" delay={i * 80}>
            <div className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-teal/10 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 font-heading text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.caption}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
