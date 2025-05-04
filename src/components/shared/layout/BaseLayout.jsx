import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import HeaderComponent from "../header/Header";
import { SideMenu } from "../side-menu/SideMenu";
import { Breadcrumb } from "../breadcumb/Breadcumb";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BaseLayout({ children, homePath, menuItems, removeLast=false }) {
  const [open, setOpen] = useState(true);
  const drawerWidth = 120;
  const [headerHeight, setHeaderHeight] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Container
        fixed
        sx={{ position: "fixed", top: 0, zIndex: 1100, width: "100%" }}
      >
        <HeaderComponent
          onToggleMenu={() => setOpen(!open)}
          onHeightChange={(height) => setHeaderHeight(height)}
        />
      </Container>

      <Box
        sx={{ display: "flex", flexGrow: 1, marginTop: "64px", zIndex: "0" }}
      >
        {open && !isMobile && (
          <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
            <SideMenu
              open={open}
              drawerWidth={drawerWidth}
              menuItems={menuItems}
            />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: open && !isMobile ? `${drawerWidth}px` : 0,
            transition: "margin 0.3s ease-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "320px",
            width: "100%",
            paddingTop: `${headerHeight}px`,
          }}
        >
          <Container maxWidth="xl">
            <Breadcrumb homePath={homePath} removeLast={removeLast}/>
          </Container>

          <Container
            maxWidth="lg"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingY: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "1200px",
                padding: 2,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {children}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
