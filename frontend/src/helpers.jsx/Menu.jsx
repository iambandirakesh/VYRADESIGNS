import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { setUser } from "../Redux/UserSlice";
import { LogoutUser } from "../apiCalls/User";
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const Mode = useSelector((state) => state.mode.mode);
  const userData = useSelector((state) => state.userData.userData);
  const open = Boolean(anchorEl);

  // Create theme (dark or light depending on darkMode state)
  const theme = createTheme({
    palette: {
      mode: Mode,
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await LogoutUser();
    // localStorage.clear();

    dispatch(setUser({}));

    // Close any open menus
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* Toggle switch for dark mode */}

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center">
            <IoPersonSharp size={20} />
            <div> {userData.name}</div>
          </div>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </ThemeProvider>
  );
}
