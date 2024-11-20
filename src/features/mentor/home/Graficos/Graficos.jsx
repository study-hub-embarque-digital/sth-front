import React from "react";
import EntregaAtividade from "../Graficos/EntregaAtividade/EntregaAtividade";
import RankingSquad from "../Graficos/RankingSquad/RankingSquad";
import QuantasAtividades from "../Graficos/QuantasAtividades/QuantasAtividades";
import { Grid } from "@mui/material";

const Graficos = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <EntregaAtividade />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RankingSquad />
      </Grid>
      <Grid item xs={12}>
        <QuantasAtividades />
      </Grid>
    </Grid>
  );
};

export default Graficos;
