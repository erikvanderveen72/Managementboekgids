export type BookScores = {
  practicalValue: number;
  readability: number;
  originality: number;
  beginnerFriendly: number;
};

export type BookLesson = {
  title: string;
  description: string;
};

export type BookMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  year?: number;
  pages?: number;
  isbn?: string;
  categories: string[];
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  excerpt: string;
  coreIdea: string;
  forWhom: string[];
  notForWhom: string[];
  strongPoints: string[];
  weakPoints: string[];
  similarBooks: string[];
  scores: BookScores;
  lessons: BookLesson[];
  affiliate: {
    managementboek?: string;
  };
};

export type Book = BookMeta & {
  contentHtml: string;
};
