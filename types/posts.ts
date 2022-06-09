export type Post = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  filePath: string;
  date: Date;
  category?: string;
  image?: string; // image path
};

export type GlobalPosts = {
  [id: string]: Post;
};

export type PostState = {
  globalPosts: GlobalPosts;
  visiblePostIds: string[];
};
