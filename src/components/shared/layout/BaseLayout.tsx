import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import HeaderComponent from "../header/Header";
import { SideMenu } from "../side-menu/SideMenu";
import { Breadcrumb } from "../breadcumb/Breadcumb";
import useMediaQuery from "@mui/material/useMediaQuery";
import { menuItems } from "./menu-items";

interface IBaseLayout {
  homePath: string,
  removeLast?: boolean,
  children?: React.ReactNode
}

export default function BaseLayout({ homePath, removeLast = false, children }: Readonly<IBaseLayout>) {
  const [open, setOpen] = useState(true);
  const drawerWidth = 120;
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <HeaderComponent onToggleMenu={() => setOpen(!open)} />

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        {open && (
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
          }}
        >
          <Container maxWidth="xl">
            <Breadcrumb homePath={homePath} removeLast={removeLast} />
          </Container>

          <Container
            maxWidth="xl"
            sx={{
              maxWidth: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingY: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "flex-start",
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
