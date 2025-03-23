import BaseLayout from "../../components/BaseLayout";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <BaseLayout homePath="/admin">
      <Outlet />
    </BaseLayout>
  );
}
