import React from "react";
import AppDefaultMentor from "../../components/AppDefaultMentor";
import { Outlet } from "react-router-dom";
import style from "./index.module.scss";

const MentorPage = () => {
  return (
    <AppDefaultMentor>
      <div className={style.layout}>
        <Outlet />
      </div>
    </AppDefaultMentor>
  );
};

export default MentorPage;
