import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const handleClick = (event) => {
  event.preventDefault();
};

export const CustomBreadcrumb = ({ icon: Icon, label, path }) => (
  <Link
    underline="hover"
    sx={{ display: "flex", alignItems: "center" }}
    color="inherit"
    href={path}
  >
    <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
    {label}
  </Link>
);

export default function IconBreadcrumbs({ children }) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {children}
      </Breadcrumbs>
    </div>
  );
}
