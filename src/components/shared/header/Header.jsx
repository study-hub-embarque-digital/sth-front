import { useRef, useEffect } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function HeaderComponent({ onToggleMenu, onHeightChange }) {
  const headerRef = useRef();

  useEffect(() => {
    if (headerRef.current && onHeightChange) {
      const height = headerRef.current.offsetHeight;
      onHeightChange(height);
    }
  }, []);

  return (
    <AppBar
      ref={headerRef}
      position="fixed"
      sx={{
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: {
          xs: "10px 16px", // celular
          sm: "15px 24px", // tablet
          md: "10px 20px", // desktop
        },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: {
            xs: "0 10px",
            sm: "0 20px",
            md: "0 40px",
          },
        }}
      >
        <IconButton onClick={onToggleMenu}>
          <MenuRoundedIcon
            sx={{
              fontSize: {
                xs: 28,
                sm: 34,
                md: 40,
              },
              color:"#351C75"
            }}
          />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo
            sx={{
              height: {
                xs: 25,
                sm: 40,
                md: 48,
              },
            }}
          />
        </Box>

        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
