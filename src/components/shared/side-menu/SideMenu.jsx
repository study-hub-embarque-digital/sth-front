import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef, useEffect, useState } from "react";

export const SideMenu = ({ open, drawerWidth, menuItems }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const drawerVariant = isDesktop ? "persistent" : "temporary";
  const paddingHeader = "1.2rem";

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <Drawer
      variant={drawerVariant}
      anchor="left"
      open={open}
      onClose={() => open(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          marginTop: '30px',
          height: `calc(100vh - ${headerHeight}px)`,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", height: "calc(100vh - 64px)" }}>
        <List>
          {menuItems.map((item) => (
            <Link
              to={item.route}
              style={{ textDecoration: "none" }}
              key={item.route}
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingY: 2,
                    gap: 1,
                    borderRadius: "20px",
                    margin: "5px",
                    backgroundColor:
                      location.pathname === item.route
                        ? "#f0f0f0"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color:
                        location.pathname === item.route
                          ? "#351C75"
                          : "#545454",
                      fontSize: isMobile ? "40px" : "60px",
                    }}
                  >
                    <item.icon sx={{ fontSize: isMobile ? "30px" : "50px" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: isMobile ? 10 : 12,
                      fontWeight: 600,
                      textAlign: "center",
                      color:
                        location.pathname === item.route
                          ? "#1E1E1E"
                          : "#9E9E9E",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
