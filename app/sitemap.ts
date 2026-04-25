import type { MetadataRoute } from "next";
import { getAllBooks, getAllCategories } from "@/lib/books";

const SITE = "https://managementboekgids.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const books = getAllBooks();
  const categories = getAllCategories();
  const now = new Date();

  const latestBookDate = books.reduce<Date>((acc, b) => {
    const d = new Date(b.updatedAt ?? b.publishedAt);
    return Number.isNaN(d.getTime()) || d < acc ? acc : d;
  }, new Date(0));

  const homepageLastMod =
    latestBookDate.getTime() > 0 ? latestBookDate : now;

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: homepageLastMod,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE}/boeken`,
      lastModified: homepageLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE}/categorieen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE}/over`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE}/affiliate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const bookUrls: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${SITE}/boeken/${b.slug}`,
    lastModified: new Date(b.updatedAt ?? b.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/categorie/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticUrls, ...bookUrls, ...categoryUrls];
}
