import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";
import { BUSINESS_NAME, SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: BUSINESS_NAME },
    publisher: { "@type": "Organization", name: BUSINESS_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
      <JsonLd data={articleSchema} />
      <Link href="/blog" className="font-heading text-sm font-bold text-teal hover:text-coral">
        ← Back to the blog
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-charcoal/50">
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

      <h1 className="mt-2 font-heading text-3xl font-extrabold text-teal sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-charcoal/85">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-6 text-center">
        <h3 className="font-heading text-lg font-bold text-teal">
          Ready For A Cleaner Yard?
        </h3>
        <p className="mt-1.5 text-sm text-charcoal/70">
          Get an instant price for Bluewater Bay & Niceville — first cleanup
          free with any recurring plan.
        </p>
        <CTAButton href="/quote" className="mt-4">
          Get Instant Quote →
        </CTAButton>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading text-lg font-bold text-teal">Keep Reading</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block rounded-xl border-2 border-teal/10 bg-white p-4 hover:border-coral/40"
              >
                <p className="font-heading text-sm font-bold text-teal">{p.title}</p>
                <span className="mt-1 inline-block text-xs font-bold text-coral">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
