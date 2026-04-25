import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const DIR = path.join(process.cwd(), "content", "categories");

export type CategoryContent = {
  slug: string;
  intro?: string;
  forWhom?: string[];
  topPick?: string;
  relatedCategories?: string[];
  contentHtml: string;
};

export async function getCategoryContent(
  slug: string,
): Promise<CategoryContent | null> {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return {
    slug,
    intro: data.intro as string | undefined,
    forWhom: (data.forWhom as string[]) ?? undefined,
    topPick: data.topPick as string | undefined,
    relatedCategories: (data.relatedCategories as string[]) ?? undefined,
    contentHtml: processed.toString(),
  };
}
