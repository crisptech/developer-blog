import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSortType } from "../lib/selectors/selectSortType";
import { updateSortType } from "../lib/slices/searchSlice";
import { sortNumToTypes, SortType, sortTypesToNum } from "../lib/types/sort";

const SortTypeComboBox = () => {
  const sortType = useSelector(selectSortType);
  const dispatch = useDispatch();
  const handleChange = (e: SelectChangeEvent<number>) => {
    const targetBoxNumber = e.target.value as number;
    dispatch(updateSortType(sortNumToTypes[targetBoxNumber]));
  };

  return (
    <FormControl size="small" margin="dense" sx={{ width: "8rem" }}>
      <InputLabel id="demo-simple-select-label">sort by</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortTypesToNum[sortType]}
        label="Sort By"
        onChange={handleChange}
      >
        {Object.keys(sortTypesToNum).map((sortTypeString) => {
          return (
            <MenuItem
              key={sortTypeString}
              value={sortTypesToNum[sortTypeString as SortType]}
            >
              {sortTypeString.toLowerCase()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SortTypeComboBox;
