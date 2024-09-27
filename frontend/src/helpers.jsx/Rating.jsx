import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
export default function BasicRating({ rating }) {
  const mode = useSelector((state) => state.mode.mode);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating name="read-only" value={4} readOnly />
      </Box>
    </ThemeProvider>
  );
}
