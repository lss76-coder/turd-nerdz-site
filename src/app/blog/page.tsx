import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips and guides on dog waste removal, lawn health, and pet care in Bluewater Bay & Niceville, FL — from the team at The Turd Nerdz.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="The Nerdz Notebook"
        title="Tips, Guides & Local Know-How"
        subtitle="Everything we've learned about keeping Florida yards clean, dogs healthy, and lawns green — from the people actually out there scooping."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
        <div className="grid gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block rounded-2xl border-2 border-teal/10 bg-white p-6 transition-transform hover:-translate-y-0.5 hover:border-coral/40 sm:p-7 ${
                i % 2 === 0 ? "-rotate-[0.3deg]" : "rotate-[0.3deg]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-charcoal/50">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{post.readMins} min read</span>
              </div>
              <h2 className="mt-2 font-heading text-xl font-bold text-teal sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-charcoal/70 sm:text-base">{post.excerpt}</p>
              <span className="mt-3 inline-block font-heading text-sm font-bold text-coral">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
