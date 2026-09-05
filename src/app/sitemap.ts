import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { BLOG_POSTS } from "@/lib/blog";
import { LOCATIONS } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/quote",
    "/services",
    "/why-us",
    "/pricing",
    "/refer-a-friend",
    "/about",
    "/faq",
    "/portal",
    "/contact",
    "/blog",
    "/locations",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const locationRoutes = LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...locationRoutes];
}
