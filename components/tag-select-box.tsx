import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { selectGlobalTags } from "../lib/selectors/selectGlobalTags";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTags } from "../lib/selectors/selectFilteredTags";
import { updatePostsFilteredTags } from "../lib/slices/searchSlice";
import { alpha } from "@mui/system";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag: string, selectedTags: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedTags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    backgroundColor:
      selectedTags.indexOf(tag) !== -1 &&
      alpha(theme.palette.primary.main, 0.16),
  };
}

const TagSelectBox = () => {
  const theme = useTheme();
  const tags = useSelector(selectGlobalTags);
  const selectedTags = useSelector(selectFilteredTags);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;

    dispatch(
      updatePostsFilteredTags(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  return (
    <div>
      <FormControl margin="dense" size="small" sx={{ width: 200 }}>
        <InputLabel id="demo-multiple-chip-label">filter tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Filter Tags" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              style={getStyles(tag, selectedTags, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TagSelectBox;
