import { compose, flatten, map, uniq } from "ramda";
import { Post } from "../types/posts";
import { Project } from "../types/projects";

export const getGlobalTagsFromObj = (posts: Post[] | Project[]) => {
  let flattenedArr = compose(
    flatten,
    map((obj: Post | Project) => {
      return obj.tags;
    })
  )(posts);

  return uniq(flattenedArr);
};
