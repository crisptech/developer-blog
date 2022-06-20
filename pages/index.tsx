import type { NextPage } from "next";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { updateSearchTerm } from "../slices/searchSlice";
import { selectSearchTerm } from "../selectors/selectSearchTerm";
import { Button, Checkbox, Paper, Typography, useTheme } from "@mui/material";
import { ColorModeContext } from "../context/colorModeContext";
import { Box } from "@mui/system";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const searchTerm = useSelector(selectSearchTerm);
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
      <Button onClick={colorTheme.toggleColorMode}>toggle colors</Button>
      <Paper>
        <Typography variant="h1">Mui h1</Typography>
        <Box></Box>
      </Paper>
    </div>
  );
};

export default Home;
