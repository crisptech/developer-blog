// export type Post = {
//   id: string;
//   title: string;
//   tags: string[];
//   description: string;
//   filePath: string;
//   date: string;
//   category?: string;
//   image?: string; // image path
// };

export type PostState = {
  globalPosts: Record<string, Post>;
  visiblePostIds: string[];
};

export type Post = {
  id: string;
  date: string;
  content: string;
};
