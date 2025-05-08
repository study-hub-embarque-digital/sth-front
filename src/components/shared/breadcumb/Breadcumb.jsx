import React from "react";
import { Breadcrumbs, Link, Typography, IconButton, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Breadcrumb = ({ homePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fullPathnames = location.pathname.split("/").filter(Boolean);
  const isMobile = useMediaQuery("(max-width:600px)");

  const formatLabel = (slug) => {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "10px 20px" : "15px 40px", 
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            marginRight: isMobile ? 1 : 2, 
            backgroundColor: "#351C75",
            padding: isMobile ? "0px" : "8px",
            color: "white",
            "&:hover": {
              backgroundColor: "#6947DB",
            },
            fontSize: isMobile ? "20px" : "30px",
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ my: 2, fontSize: isMobile ? "14px" : "32px" }} 
        >
          {/* <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(homePath)}
            sx={{
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "32px", 
              fontWeight: "700",
              color: "#000000",
              "&:hover": {
                color: "#6947DB",
                textDecoration: "none",
              },
            }}
          >
            Home
          </Link> */}

          {fullPathnames.map((value, index) => {
            const to = "/" + fullPathnames.slice(0, index + 2).join("/");
            const isLast = index === fullPathnames.length - 2;
            const label = formatLabel(value);

            return isLast ? (
              <Typography
                sx={{
                  fontSize: isMobile ? "14px" : "32px",
                  fontWeight: "700",
                  color: (theme) => theme.palette.breadcrumb,
                }}
                color="text.primary"
                key={to}
              >
                {label}
              </Typography>
            ) : (
              <Link
                underline="hover"
                color="inherit"
                sx={{
                  cursor: "pointer",
                  fontSize: isMobile ? "14px" : "32px",
                  fontWeight: "700",
                  color: (theme) => theme.palette.breadcrumb,
                  "&:hover": {
                    color: "#6947DB",
                    textDecoration: "none",
                  },
                }}
                onClick={() => navigate(to)}
                key={to}
              >
                {label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    </div>
  );
};
