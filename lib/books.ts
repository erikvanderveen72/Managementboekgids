import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Book, BookMeta } from "./types";

const BOOKS_DIR = path.join(process.cwd(), "content", "boeken");

function listSlugs(): string[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  return fs
    .readdirSync(BOOKS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(slug: string) {
  const fullPath = path.join(BOOKS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  return matter(raw);
}

function coverFromIsbn(isbn?: string): string | undefined {
  if (!isbn) return undefined;
  const clean = isbn.replace(/[^0-9Xx]/g, "");
  if (!clean) return undefined;
  return `https://i.mgtbk.nl/boeken/${clean}-920x960.jpg`;
}

function toMeta(slug: string, data: Record<string, unknown>): BookMeta {
  const isbn = data.isbn as string | undefined;
  const explicitCover = data.coverImage as string | undefined;
  return {
    slug,
    title: String(data.title ?? slug),
    subtitle: data.subtitle as string | undefined,
    authors: (data.authors as string[]) ?? [],
    publisher: data.publisher as string | undefined,
    year: data.year as number | undefined,
    pages: data.pages as number | undefined,
    isbn,
    categories: (data.categories as string[]) ?? [],
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt as string | undefined,
    coverImage: explicitCover || coverFromIsbn(isbn),
    excerpt: String(data.excerpt ?? ""),
    coreIdea: String(data.coreIdea ?? ""),
    forWhom: (data.forWhom as string[]) ?? [],
    notForWhom: (data.notForWhom as string[]) ?? [],
    strongPoints: (data.strongPoints as string[]) ?? [],
    weakPoints: (data.weakPoints as string[]) ?? [],
    similarBooks: (data.similarBooks as string[]) ?? [],
    scores: (data.scores as BookMeta["scores"]) ?? {
      practicalValue: 0,
      readability: 0,
      originality: 0,
      beginnerFriendly: 0,
    },
    lessons: (data.lessons as BookMeta["lessons"]) ?? [],
    affiliate: (data.affiliate as BookMeta["affiliate"]) ?? {},
  };
}

export function getAllBookSlugs(): string[] {
  return listSlugs();
}

export function getAllBooks(): BookMeta[] {
  const books = listSlugs().map((slug) => {
    const { data } = readRaw(slug);
    return toMeta(slug, data);
  });
  return books.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getBook(slug: string): Promise<Book | null> {
  if (!fs.existsSync(path.join(BOOKS_DIR, `${slug}.md`))) return null;
  const { data, content } = readRaw(slug);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return {
    ...toMeta(slug, data),
    contentHtml: processed.toString(),
  };
}

export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const book of getAllBooks()) {
    for (const cat of book.categories) {
      map.set(cat, (map.get(cat) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "nl"));
}

export function getBooksByCategorySlug(slug: string): BookMeta[] {
  return getAllBooks().filter((b) =>
    b.categories.some((c) => categorySlug(c) === slug),
  );
}

export function getCategoryName(slug: string): string | null {
  const match = getAllCategories().find((c) => c.slug === slug);
  return match?.name ?? null;
}
