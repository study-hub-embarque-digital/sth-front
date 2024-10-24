import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Typography from "@mui/material/Typography";
import styles from "./RankingSquad.module.scss";

const RankingSquad = () => {
  const theme = useTheme();

  return (
    <div
      className={styles.RankingSquad}
      style={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 4px 12px rgba(105, 71, 219, 1.5)",
      }}
    >
      <Typography className={styles.title}>Ranking dos Squads que mais fizeram entregas</Typography>
      <div className={styles.chartContainer}>
        <SparkLineChart
          plotType="bar"
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          height={100}
          showHighlight={true}
          showTooltip={true}
        />
      </div>
    </div>
  );
};

export default RankingSquad;
