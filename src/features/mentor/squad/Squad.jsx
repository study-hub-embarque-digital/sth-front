import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import TableSquad from "./TableSquad";
import NavigationTitlePage from "../../../components/NavigationTitlePage";
import styles from "./Squad.module.scss";
import squadService from "../../../services/squadService";

const Squad = () => {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSquads = async () => {
    try {
      const data = await squadService.getAllSquads();
      setSquads(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSquads();
  }, []);

  return (
    <div>
      <NavigationTitlePage name={"Squad"} path={"/mentor"} />
      <div className={styles.Filter}>
        <Filter />
      </div>
      <TableSquad squads={squads} loading={loading} />
    </div>
  );
};

export default Squad;
