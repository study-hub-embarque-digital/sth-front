import React from "react";
import Graficos from "./Graficos/Graficos";
import NavigationTitlePage from "../../../components/NavigationTitlePage";

const HomeMentor = () => {
  return (
    <div>
      <NavigationTitlePage name={"Home"} path={"/mentor"} />
      <Graficos />
    </div>
  );
};

export default HomeMentor;
