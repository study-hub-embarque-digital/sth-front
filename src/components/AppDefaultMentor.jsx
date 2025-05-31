import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logoSmall2.svg";
import HomeIcon from "@mui/icons-material/Home";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import Face6OutlinedIcon from "@mui/icons-material/Face6Outlined";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import "./components.scss";

const NAVIGATION = [
  {
    segment: "mentor",
    title: "Home",
    icon: <HomeIcon />,
    path: "/mentor",
  },
  {
    segment: "mentor/squad",
    title: "Squad",
    icon: <PeopleIcon />,
    path: "/mentor/squad",
  },
  {
    segment: "mentor/artigos",
    title: "Artigos",
    icon: <BookOutlinedIcon />,
    path: "/mentor/artigos",
  },
  {
    segment: "mentor/rooms",
    title: "Rooms",
    icon: <MeetingRoomOutlinedIcon />,
    path: "/mentor/rooms",
  },
  {
    segment: "mentor/alunos",
    title: "Alunos",
    icon: <Face6OutlinedIcon />,
    path: "/mentor/alunos",
  },
  {
    segment: "mentor/comunidade",
    title: "Comunidade",
    icon: <ChatIcon />,
    path: "/mentor/comunidade",
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBranding(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigationClick = (path) => {
    navigate(path);
  };

  const updatedNavigation = NAVIGATION.map((item) => {
    const isActive = location.pathname === item.path;
    return {
      ...item,
      onClick: () => handleNavigationClick(item.path),
      icon: React.cloneElement(item.icon, {
        className: isActive ? "active-icon" : "default-icon",
      }),
      title: (
        <span className={isActive ? "active-text" : "default-text"}>
          {item.title}
        </span>
      ),
    };
  });

  return (
    <AppProvider
      navigation={updatedNavigation}
      branding={{
        logo: <img src={logo} alt="logo" />,
        title: "",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>{props.children}</DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
