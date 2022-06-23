import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TagSelectBox from "./tag-select-box";
import SortTypeComboBox from "./sort-type-combo-box";
import SortOrderSwitch from "./sort-order-switch";
import { useSelector } from "react-redux";
import { selectSortOrder } from "../lib/selectors/selectSortOrder";
import { Container } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const sortOrder = useSelector(selectSortOrder);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Filter settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: "32px", height: "32px" }}>
              <FilterAltIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="filter-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          width="100%"
          sx={{ display: "flex", justifyContent: "flex-end", paddingX: "1em" }}
        >
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ width: "20px", height: "20px" }} />
          </IconButton>
        </Box>
        <MenuItem>
          <TagSelectBox />
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ display: "flex", gap: "1em" }}>
            <SortTypeComboBox />
            <Box>
              <SortOrderSwitch />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ fontSize: "0.5em" }}
              >
                {sortOrder.toLowerCase()}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}
