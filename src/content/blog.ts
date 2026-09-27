// Writing. Empty until the first post; the section stays off (site.flags.showBlog).

export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-02". */
  date: string;
  summary: string;
};

export const posts: Post[] = [];
