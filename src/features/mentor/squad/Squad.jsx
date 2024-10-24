import React from "react";
import Filter from "./Filter";
import TableSquad from "./TableSquad";
import NavigationTitlePage from "../../../components/NavigationTitlePage";
import styles from "./Squad.module.scss";

const Squad = () => {
  return (
    <div>
      <NavigationTitlePage name={"Squad"} path={"/mentor"} />
      <div className={styles.Filter}>
        <Filter />
      </div>
      <TableSquad />
    </div>
  );
};

export default Squad;
