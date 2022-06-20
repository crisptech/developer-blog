import type { NextPage } from "next";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { updateSearchTerm } from "../lib/slices/searchSlice";
import { selectSearchTerm } from "../lib/selectors/selectSearchTerm";
import { Button, Paper, Typography } from "@mui/material";
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
import ColorModeSwitch from "../components/color-mode-switch";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const searchTerm = useSelector(selectSearchTerm);
  const posts = useSelector(selectVisiblePosts);
  const postsIds = useSelector(selectVisiblePostIds);
  const colorTheme = useContext(ColorModeContext);

  useEffect(() => {
    dispatch(updateSearchTerm("mwuaha"));
  }, []);

  function handleClick(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    setCount(count + 1);
    dispatch(updateSearchTerm(`testing ${count}`));
  }

  return (
    <div className={styles.container}>
      {searchTerm}
      <Button onClick={handleClick}>increment search term</Button>
      <Typography>Color theme component</Typography>
      <ColorModeSwitch onClick={colorTheme.toggleColorMode} />
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

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const posts = await getAllPostsData();
    const postsRecords = postsToRecords(posts);
    await store.dispatch(updateGlobalPosts(postsRecords));
    const sortedPostIds = getSortedPostIds(posts);
    await store.dispatch(udpateVisiblePostIds(sortedPostIds));

    return {
      props: {},
    };
  }
);

export default Home;
