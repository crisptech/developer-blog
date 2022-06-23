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
      label="Filter Posts"
      variant="outlined"
      value={searchTerm}
    />
  );
};

export default SearchTermBox;
