export type Post = {
  id: string;
  date: string;
  content: string;
  title: string;
  description: string;
  duration?: string;
  tags: string[];
  image: string; // image path
};

export type PostState = {
  globalPosts: Record<string, Post>;
  visiblePostIds: string[];
};
