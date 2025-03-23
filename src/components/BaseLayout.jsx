import React, { useState } from "react";
import { Box } from "@mui/material";
import HeaderComponent from "./shared/header/Header";
import { SideMenu } from "./shared/side-menu/SideMenu";
import { Breadcrumb } from "./shared/breadcumb/Breadcumb";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BaseLayout({ children, homePath }) {
  const [open, setOpen] = useState(true);
  const drawerWidth = 120;
  const [headerHeight, setHeaderHeight] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const menuItems = [
    { text: "Home", icon: HomeRoundedIcon, route: "/admin" },
    { text: "Squads", icon: GroupsRoundedIcon, route: "/admin/alunos" },
    { text: "Alunos", icon: SchoolRoundedIcon, route: "/admin/alunos" },
    { text: "Empresas", icon: MapsHomeWorkRoundedIcon, route: "/admin/alunos" },
    { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "/admin/alunos" },
    {
      text: "Representantes",
      icon: BusinessCenterRoundedIcon,
      route: "/admin/alunos",
    },
    { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "/admin/alunos" },
  ];

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
          transition: "margin 0.3s",
          marginTop: `${headerHeight}px`,
          display: "flex",
          justifyContent: isMobile? "normal" : "center",
          alignItems: 'flex-start',
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Breadcrumb homePath={homePath} />
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
            width: "100%",
          }}I
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
