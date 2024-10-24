import React from "react";
import AppDefaultMentor from "../../components/AppDefaultMentor";
import { Outlet } from "react-router-dom";
import "./index.scss";

const MentorPage = () => {
  return (
    <AppDefaultMentor>
      <div className="laouyt">
        <Outlet />
      </div>
    </AppDefaultMentor>
  );
};

export default MentorPage;
