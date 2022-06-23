import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compose, indexBy, map, prop, split, trim } from "ramda";
import { Post } from "./types/posts";
import Error from "next/error";
import { splitAndTrim } from "./util/splitAndTrim";

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

export const getSortedPostIds = (unsortedPosts: Post[]): string[] => {
  const allSortedPosts = [...unsortedPosts].sort((postA, postB) => {
    const dateA: Date = new Date(postA.date);
    const dateB: Date = new Date(postB.date);
    return dateA < dateB ? 1 : -1;
  });

  return allSortedPosts.map((post) => post.id);
};

export const getPostData = (id: string): Post => {
  const postPath = path.join(filesPath, `${id}.md`);
  const fileData = fs.readFileSync(postPath, "utf-8");

  const matterOfFile = matter(fileData);

  try {
    return {
      id,
      date: valueIfExists(matterOfFile.data.date),
      title: valueIfExists(matterOfFile.data.title),
      description: valueIfExists(matterOfFile.data.description),
      content: valueIfExists(matterOfFile.content),
      duration: valueIfExists(matterOfFile.data.duration),
      // tags are a string list with comma separators
      tags: splitAndTrim(matterOfFile.data.tags),
      image: valueIfExists(matterOfFile.data.image),
    };
  } catch (error) {
    throw Error;
  }
};

const valueIfExists = (value: string | null) => {
  return value ? value : "";
};
