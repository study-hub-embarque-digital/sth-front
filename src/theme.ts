/// <reference path="./theme.d.ts" />
import { createTheme } from "@mui/material/styles";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#351C75",
    },
    background: {
      default: "#F8F8F8",
      paper: "#FFF",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#444444",
      caption: '#808080'
    },
    breadcrumb: "#1E1E1E",
    button: "#351C75",
    hover: "#e0e0e0",
    active: "#e0e0e0",
    tabs: {
      activeTab: '#6947DB',
      border: '#000',
    },
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#351C75",
    },
    secondary: {
      main: "#FFFFFF",
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
    hover: "#444444",
    active: "#878787",
    tabs: {
      activeTab: '#6947DB',
      border: '#FFF',
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
