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

export const SideMenu = ({ open, drawerWidth, menuItems }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "64px",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
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
                      fontSize: "90px",
                    }}
                  >
                    <item.icon sx={{ fontSize: "30px" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 12,
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
