import React, { useRef, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../contexts/AuthContext";
import { IMenuItem } from "../layout/menu-items";

interface ISideMenu {
  open: boolean,
  drawerWidth: number,
  menuItems: IMenuItem[]
}

export const SideMenu = ({ open, drawerWidth, menuItems }: ISideMenu) => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const drawerVariant = isDesktop ? "persistent" : "temporary";
  const { logout } = useAuth();
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const { hasAnyPermission } = useAuth();

  const handleCancel = () => {
    setLogoutDialogOpen(false);
  }

  const handleAccept = () => {
    setLogoutDialogOpen(false);
    logout();
  }

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
      // onClose={() => open(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1200,
        backgroundColor: '#FFF',
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
          {menuItems.map((item, index) => (
            (item.permissions.length <= 0 || hasAnyPermission(item.permissions)) && <Link
              to={item.route}
              style={{ textDecoration: "none" }}
              key={`${item.route}_${index}`}
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
                        ? (theme) => theme.palette.active
                        : "transparent",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.hover,
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

      <LogoutDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={logoutDialogOpen} />

      <Box
        onClick={() => setLogoutDialogOpen(true)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          mb: 10,
        }}
      >

        <IconButton>
          <LogoutIcon fontSize="large" sx={{ fontSize: isMobile ? "30px" : "50px" }} />
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            color: "#545454",
            fontWeight: 500,
            mt: 0.5
          }}
        >
          Logout
        </Typography>
      </Box>
    </Drawer>
  );
};

const LogoutDialog = ({ open, handleAccept, handleCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Sair da conta"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Essa ação fará com que você seja deslogado de sua conta e seja redirecionado para página de login. Certeza que deseja continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCancel()}>Cancelar</Button>
        <Button onClick={() => handleAccept()} autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  )
}