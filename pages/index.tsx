import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { updateGlobalTags } from "../lib/slices/searchSlice";
import { selectSearchTerm } from "../lib/selectors/selectSearchTerm";
import { Paper, Typography } from "@mui/material";
import { ColorModeContext } from "../context/colorModeContext";
import {
  getAllPostsData,
  getSortedPostIds,
  postsToRecords,
} from "../lib/posts";
import { wrapper } from "../app/store";
import {
  udpateVisiblePostIds,
  updateGlobalPosts,
} from "../lib/slices/postsSlice";
import { selectVisiblePostIds } from "../lib/selectors/selectVisiblePostIds";
import { selectVisiblePosts } from "../lib/selectors/selectVisiblePosts";
import Link from "next/link";
import BlogTimeline from "../components/blog-timeline";
import SortOrderSwitch from "../components/sort-order-switch";
import { selectSortOrder } from "../lib/selectors/selectSortOrder";
import { selectSortType } from "../lib/selectors/selectSortType";
import { AnyAction, Dispatch } from "redux";
import { SortOrder, SortType } from "../lib/types/sort";
import { Post } from "../lib/types/posts";
import SortTypeComboBox from "../components/sort-type-combo-box";
import ColorModeSwitch from "../components/color-mode-switch";
import { compose, flatten, intersection, map, uniq } from "ramda";
import { updateInitialLoad } from "../lib/slices/configSlice";
import TagSelectBox from "../components/tag-select-box";
import { selectFilteredTags } from "../lib/selectors/selectFilteredTags";
import { selectGlobalPosts } from "../lib/selectors/selectGlobalPosts";
import SearchTermBox from "../components/search-term-box";
import Fuse from "fuse.js";

const updateVisiblePostOrder = (
  dispatch: Dispatch<AnyAction>,
  visiblePosts: Post[],
  sortType: SortType,
  sortOrder: SortOrder
) => {
  switch (sortType) {
    case "DATE":
      const sortDateVisiblePosts = [...visiblePosts].sort((postA, postB) => {
        const dateA = new Date(postA.date);
        const dateB = new Date(postB.date);
        return dateA < dateB
          ? sortOrder === "ASCENDING"
            ? 1
            : -1
          : sortOrder === "ASCENDING"
          ? -1
          : 1;
      });

      const sortedDatePostsIds = sortDateVisiblePosts.map((post) => post.id);

      dispatch(udpateVisiblePostIds(sortedDatePostsIds));
      break;
    case "DURATION":
      const sortDurVisiblePosts = [...visiblePosts].sort((postA, postB) => {
        let durationA = 0;
        let durationB = 0;

        if (postA.duration !== undefined) {
          const regA = postA.duration.match(/\d+/g);
          durationA = regA === null ? 0 : Number(regA[0]);
        }

        if (postB.duration !== undefined) {
          const regB = postB.duration.match(/\d+/g);
          durationB = regB === null ? 0 : Number(regB[0]);
        }

        return durationA < durationB
          ? sortOrder === "ASCENDING"
            ? 1
            : -1
          : sortOrder === "ASCENDING"
          ? -1
          : 1;
      });

      const sortedDurPostsIds = sortDurVisiblePosts.map((post) => post.id);
      dispatch(udpateVisiblePostIds(sortedDurPostsIds));
      break;
    case "TITLE":
      const sortTitleVisiblePosts = [...visiblePosts].sort((postA, postB) => {
        return postA.title < postB.title
          ? sortOrder === "ASCENDING"
            ? 1
            : -1
          : sortOrder === "ASCENDING"
          ? -1
          : 1;
      });

      const sortedTitlePostsIds = sortTitleVisiblePosts.map((post) => post.id);
      dispatch(udpateVisiblePostIds(sortedTitlePostsIds));
      break;
  }
};

const fuseSearch = (posts: Post[], keys: string[], searchTerm: string) => {
  const fuse = new Fuse([...posts], {
    keys: [...keys],
  });

  const fuseResults = fuse.search(searchTerm);

  const updatedPosts: Post[] = fuseResults.map((fuseResult) => fuseResult.item);

  return updatedPosts;
};

const filterTagsUpdateVisiblePosts = (
  dispatch: Dispatch<AnyAction>,
  globalPosts: Post[],
  filteredTags: string[],
  searchTerm: string
): Post[] => {
  let updatedPosts =
    filteredTags.length === 0
      ? globalPosts
      : [...globalPosts].filter((post) => {
          return intersection(post.tags, filteredTags).length !== 0;
        });

  updatedPosts =
    searchTerm.length === 0
      ? updatedPosts
      : fuseSearch(
          updatedPosts,
          ["title", "description", "content"],
          searchTerm
        );

  let updatedPostsIds = updatedPosts.map((post) => post.id);

  dispatch(udpateVisiblePostIds(updatedPostsIds));

  return updatedPosts;
};

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const sortOrder = useSelector(selectSortOrder);
  const posts = useSelector(selectVisiblePosts);
  const globalPosts = useSelector(selectGlobalPosts);
  const postsIds = useSelector(selectVisiblePostIds);
  const sortType = useSelector(selectSortType);
  const filteredTags = useSelector(selectFilteredTags);
  const colorTheme = useContext(ColorModeContext);

  useEffect(() => {
    dispatch(updateInitialLoad(false));
  }, []);

  useEffect(() => {
    updateVisiblePostOrder(dispatch, posts, sortType, sortOrder);
  }, [sortType, sortOrder]);

  useEffect(() => {
    const updatedPosts = filterTagsUpdateVisiblePosts(
      dispatch,
      Object.values(globalPosts),
      filteredTags,
      searchTerm
    );
    updateVisiblePostOrder(dispatch, updatedPosts, sortType, sortOrder);
  }, [filteredTags, searchTerm]);

  return (
    <div className={styles.container}>
      <Typography>Color theme component</Typography>
      <ColorModeSwitch
        toggleColorMode={colorTheme.toggleColorMode}
        colorMode={colorTheme.colorMode}
      />
      <SearchTermBox />
      <SortOrderSwitch />
      <TagSelectBox />
      <SortTypeComboBox />
      <Paper>
        <Typography variant="h1">Mui h1</Typography>
      </Paper>
      <Paper>
        {postsIds.map((id) => (
          <Link href={`/posts/${id}`}>{id}</Link>
        ))}
      </Paper>
      <BlogTimeline posts={posts} />
    </div>
  );
};

const getGlobalTagsFromPosts = (posts: Post[]) => {
  let flattenedArr = compose(
    flatten,
    map((post: Post) => {
      return post.tags;
    })
  )(posts);

  return uniq(flattenedArr);
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const posts = await getAllPostsData();
    const postsRecords = postsToRecords(posts);
    await store.dispatch(updateGlobalPosts(postsRecords));
    const sortedPostIds = getSortedPostIds(posts);
    await store.dispatch(udpateVisiblePostIds(sortedPostIds));
    const globalTags = getGlobalTagsFromPosts(posts);
    await store.dispatch(updateGlobalTags(globalTags));

    return {
      props: {},
    };
  }
);

export default Home;
