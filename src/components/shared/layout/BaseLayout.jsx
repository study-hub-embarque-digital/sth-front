import React, { useState, useCallback } from "react";
import { Box, Container } from "@mui/material";
import HeaderComponent from "../header/Header";
import { SideMenu } from "../side-menu/SideMenu";
import { Breadcrumb } from "../breadcumb/Breadcumb";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { Outlet } from "react-router-dom";

  export default function BaseLayout({ homePath, removeLast=false }) {
  const menuItems = [
    { text: "Home", icon: HomeRoundedIcon, route: "/admin" },
    { text: "Squads", icon: GroupsRoundedIcon, route: "/squads" },
    { text: "Alunos", icon: SchoolRoundedIcon, route: "/alunos" },
    // { text: "Empresas", icon: MapsHomeWorkRoundedIcon, route: "" },
    // { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "" },
    {
      text: "Mentores",
      icon: FolderRoundedIcon,
      route: "/mentores",
    },
    // {
    //   text: "Mentores",
    //   icon: BusinessCenterRoundedIcon,
    //   route: "/mentores",
    // },
    // { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "" },
  ];
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
            <Breadcrumb homePath={homePath} removeLast={removeLast}/>
          </Container>

          <Container
            maxWidth="sx"
            sx={{
              maxWidth: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingY: 3,
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
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
