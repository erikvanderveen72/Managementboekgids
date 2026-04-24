import type { MetadataRoute } from "next";
import { getAllBooks, getAllCategories } from "@/lib/books";

const SITE = "https://managementboekgids.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const books = getAllBooks();
  const categories = getAllCategories();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/boeken`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/categorieen`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/over`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/affiliate`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const bookUrls: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${SITE}/boeken/${b.slug}`,
    lastModified: b.updatedAt ?? b.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/categorie/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticUrls, ...bookUrls, ...categoryUrls];
}
