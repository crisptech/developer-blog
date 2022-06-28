import { styled, Switch } from "@mui/material";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSortOrder } from "../lib/selectors/selectSortOrder";
import { updateSortOrder } from "../lib/slices/searchSlice";
import { SortOrder } from "../lib/types/sort";

const SortOrderSwitchButton = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.grey[100]
      )}" d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.divider
      )}" d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const switchSortOrder = (sortOrder: SortOrder) => {
  return sortOrder === "ASCENDING" ? "DESCENDING" : "ASCENDING";
};

const SortOrderSwitch = () => {
  const sortOrder = useSelector(selectSortOrder);
  const dispatch = useDispatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const newSortOrder = switchSortOrder(sortOrder);
    dispatch(updateSortOrder(newSortOrder));
  };

  return (
    <SortOrderSwitchButton
      onClick={handleClick}
      checked={sortOrder === "ASCENDING"}
    />
  );
};

export default SortOrderSwitch;
