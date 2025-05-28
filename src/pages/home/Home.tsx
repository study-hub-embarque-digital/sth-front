import React from "react";
import BaseLayout from "../../components/shared/layout/BaseLayout";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <BaseLayout homePath="/home">
      <Outlet />
    </BaseLayout>
  );
}

export { Home }