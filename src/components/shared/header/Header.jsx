import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Logo } from "./Logo";
import { MaterialUISwitch } from "./MuiSwitch";
import ThemeToggle from "./ThemeToggle";

export default function HeaderComponent({ onToggleMenu }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "20px 40px",
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 40px" }}>
        <IconButton onClick={onToggleMenu}>
          <MenuRoundedIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Logo />
        <ThemeToggle/>
      </Toolbar>
    </AppBar>
  );
}
