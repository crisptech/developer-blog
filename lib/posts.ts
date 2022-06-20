import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { indexBy, prop } from "ramda";
import { Post } from "../types/posts";

const filesPath = path.join("public", "posts");

export const getAllPostIds = async () => {
  const fileNames = await fs.promises.readdir(filesPath);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

type PostIdParams = {
  params: {
    id: string;
  };
};

export const getAllPostIdsAsStrings = (postIdsObjs: PostIdParams[]) => {
  return postIdsObjs.map((postId) => {
    return postId.params.id;
  });
};

export const postsToRecords = (posts: Post[]): Record<string, Post> => {
  return indexBy(prop("id"), posts);
};

export const getAllPostsData = async (): Promise<Post[]> => {
  const allPostIds = await getAllPostIds();

  const allPosts = allPostIds.map((postIdObj) => {
    return getPostData(postIdObj.params.id);
  });

  return allPosts;
};

export const getPostData = (id: string): Post => {
  const postPath = path.join(filesPath, `${id}.md`);
  const fileData = fs.readFileSync(postPath, "utf-8");

  const matterOfFile = matter(fileData);
  console.log(matterOfFile);

  return {
    id,
    date: matterOfFile.data.date,
    content: matterOfFile.content,
  };
};
