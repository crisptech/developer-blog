import { TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm } from "../lib/selectors/selectSearchTerm";
import { updateSearchTerm } from "../lib/slices/searchSlice";

const SearchTermBox = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const {
      target: { value },
    } = e;

    dispatch(updateSearchTerm(value));
  };

  return (
    <TextField
      onChange={handleChange}
      id="outlined-basic"
      label="search posts"
      variant="outlined"
      value={searchTerm}
      size="small"
      margin="dense"
      sx={{ borderRadius: "50%" }}
    />
  );
};

export default SearchTermBox;
