import { STOCK_HANDLED_VIDEO_URL } from "@/lib/stockMedia";
import CTAButton from "@/components/CTAButton";

export default function VideoSection() {
  return (
    <section className="relative flex min-h-[26rem] items-center overflow-hidden sm:min-h-[32rem]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={STOCK_HANDLED_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-charcoal/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="max-w-lg text-cream">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-coral">
            See It In Action
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">
            This Is What &quot;Handled&quot; Looks Like
          </h2>
          <p className="mt-3 text-cream/85">
            A dog, a yard, and a job we genuinely don&apos;t mind doing. This
            is what a visit from The Turd Nerdz actually looks like.
          </p>
          <CTAButton href="/quote" className="mt-6">
            Get Instant Quote →
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
