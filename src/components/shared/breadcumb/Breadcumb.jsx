import React from "react";
import { Breadcrumbs, Link, Typography, IconButton, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Breadcrumb = ({ homePath, removeLast = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let fullPathnames = location.pathname.split("/").filter(Boolean);

  if (removeLast) {
    fullPathnames = fullPathnames.slice(0, -1);
  }

  const isMobile = useMediaQuery("(max-width:600px)");

  const formatLabel = (slug) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const splitedSlug = slug.split('-');
    const possibleUuid = splitedSlug?.slice(splitedSlug.length - 5, splitedSlug.length);

    const finalSlug = uuidRegex.test(possibleUuid.join("-")) ? splitedSlug?.slice(0, splitedSlug.length - 5).join("-") : splitedSlug.join("-");

    return finalSlug
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
          {fullPathnames.map((value, index) => {
            const to = "/" + fullPathnames.slice(0, index + 1).join("/");
            const isLast = index === fullPathnames.length - 1;
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
