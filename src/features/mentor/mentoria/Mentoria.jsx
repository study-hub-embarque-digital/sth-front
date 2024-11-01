import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import squadService from "../../../services/squadService";
import NavigationTitlePage from "../../../components/NavigationTitlePage";

const Mentoria = () => {
  const { id } = useParams();
  const [squadData, setSquadData] = useState(null);
  const [loading, setLoading] = useState(true);

  const detailSquad = async (id) => {
    try {
      const data = await squadService.squadDetail(id);
      setSquadData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      detailSquad(id);
    }
  }, [id]);

  return (
    <div>
      <NavigationTitlePage name={"Mentoria"} path={"/mentor/squad"} />
    </div>
  );
};

export default Mentoria;
