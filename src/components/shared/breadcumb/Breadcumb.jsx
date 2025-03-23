import React from "react";
import { Breadcrumbs, Link, Typography, IconButton, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";

export const Breadcrumb = ({ homePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fullPathnames = location.pathname.split("/").filter(Boolean);

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
          padding: "15px 40px",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            marginRight: 2,
            backgroundColor: "#351C75",
            color: "white", 
            "&:hover": {
              backgroundColor: "#6947DB", 
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(homePath)}
            sx={{
              cursor: "pointer",
              fontSize: "32px",
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
            // Começa a iteração do segundo item
            const to = "/" + fullPathnames.slice(0, index + 2).join("/"); // Inclui a primeira rota ignorada no link
            const isLast = index === fullPathnames.length - 2; 
            const label = formatLabel(value);

            return isLast ? (
              <Typography
                sx={{
                  fontSize: "32px",
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
                  fontSize: "32px",
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
