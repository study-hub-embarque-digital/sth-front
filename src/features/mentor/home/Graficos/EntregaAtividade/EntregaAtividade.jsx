import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from"./EntregaAtividade.module.scss";

const EntregaAtividade = () => {
  const theme = useTheme();

  return (
    <div
      className={styles.EntregaAtividade}
      style={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 4px 12px rgba(105, 71, 219, 1.5)",
      }}
    >
      <Typography className={styles.title}>Entrega das atividades</Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default EntregaAtividade;
