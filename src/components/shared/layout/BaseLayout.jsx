import React, { useState } from "react";
import { Box } from "@mui/material";
import HeaderComponent from "../header/Header";
import { SideMenu } from "../side-menu/SideMenu";
import { Breadcrumb } from "../breadcumb/Breadcumb";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BaseLayout({ children, homePath, menuItems }) {
  const [open, setOpen] = useState(true);
  const drawerWidth = 120;
  const [headerHeight, setHeaderHeight] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ display: "flex" }}>
      <HeaderComponent
        onToggleMenu={() => setOpen(!open)}
        onHeightChange={(height) => setHeaderHeight(height)}
      />

      {open && (
        <SideMenu open={open} drawerWidth={drawerWidth} menuItems={menuItems} />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: open && !isMobile ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease-out",
          marginTop: `${headerHeight}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "calc(100% - 120px)", 
          minWidth: "320px", 
          overflowX: "hidden", 
        }}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
        >
          <Breadcrumb homePath={homePath} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1, 
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: "1200px",
              padding: 1,
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
