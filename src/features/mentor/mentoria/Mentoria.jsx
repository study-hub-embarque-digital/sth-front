import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import React, { useState, useEffect } from "react";
import squadService from "../../../services/squad/squadService";
import NavigationTitlePage from "../../../components/NavigationTitlePage";

const Mentoria = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [squadData, setSquadData] = useState(null);

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

  console.log(squadData);
  return (
    <div>
      <NavigationTitlePage name={"Mentoria"} path={"/mentor/squad"} />
    </div>
  );
};

export default Mentoria;
