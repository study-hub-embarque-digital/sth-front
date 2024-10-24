import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logoSmall2.svg";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import "./components.scss";

// Definição do menu de navegação
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
