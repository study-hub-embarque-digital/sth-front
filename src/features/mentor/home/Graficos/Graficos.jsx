import React from "react";
import EntregaAtividade from "../Graficos/EntregaAtividade/EntregaAtividade";
import { Grid } from "@mui/material";

const Graficos = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <EntregaAtividade />
      </Grid>
    </Grid>
  );
};

export default Graficos;
