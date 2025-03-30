import React from "react";
import { Breadcrumbs, Link, Typography, IconButton, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Breadcrumb = ({ homePath, removeLast = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let fullPathnames = location.pathname.split("/").filter(Boolean);

  // Remove o último segmento apenas se `removeLast` for `true`
  if (removeLast) {
    fullPathnames = fullPathnames.slice(0, -1);
  }

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
          <Link
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
          </Link>

            {fullPathnames.slice(1).map((value, index) => {
              const to = "/" + fullPathnames.slice(0, index + 2).join("/");
              const isLast = index === fullPathnames.length - 2;
              const label = formatLabel(value);

              return isLast ? (
                <Typography
                  sx={{
                    fontSize: isMobile ? "14px" : "32px",
                    fontWeight: "700",
                    color: "#000000",
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
                    color: "#000000",
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
