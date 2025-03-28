import { createTheme } from "@mui/material/styles";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#444444",
    },
    breadcrumb: "#351C75",
    button: "#351C75",
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF5733",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#F0F0F0",
      secondary: "#B0B0B0",
    },
    breadcrumb: "#FFFFFF",
    button: "#6947DB",
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
