import { Outlet } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

export default function AdminPage() {
  return (
    <>
    <h1>OLA</h1>
    <Outlet/>
    </>

  );
}
