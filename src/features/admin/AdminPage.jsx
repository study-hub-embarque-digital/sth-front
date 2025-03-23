import BaseLayout from "../../components/BaseLayout";
import { Breadcrumb } from "../../components/shared/breadcumb/Breadcumb";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <BaseLayout>
      <Breadcrumb homePath="/admin" />
      <Outlet />
    </BaseLayout>
  );
}
