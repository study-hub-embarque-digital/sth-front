import BaseLayout from "../../components/shared/layout/BaseLayout";
import { Outlet } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

export default function AdminPage() {
  const menuItems = [
    { text: "Home", icon: HomeRoundedIcon, route: "/admin" },
    { text: "Squads", icon: GroupsRoundedIcon, route: "/admin/alunos" },
    { text: "Alunos", icon: SchoolRoundedIcon, route: "/admin/alunos" },
    { text: "Empresas", icon: MapsHomeWorkRoundedIcon, route: "/admin/alunos" },
    { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "/admin/alunos" },
    {
      text: "Representantes",
      icon: BusinessCenterRoundedIcon,
      route: "/admin/alunos",
    },
    { text: "I.E's", icon: AccountBalanceRoundedIcon, route: "/admin/alunos" },
  ];
  return (
    <BaseLayout homePath="/admin" menuItems={menuItems}>
      <Outlet />
    </BaseLayout>
  );
}
