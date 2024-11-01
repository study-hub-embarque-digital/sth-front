import * as React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import styles from "./Squad.module.scss";

const squads = ["Squad A", "Squad B", "Squad C", "Squad D", "Squad E"];
const institutions = ["Unicap", "Cesar", "Senac", "Imaculada"];

const Filter = () => {
  const [selectedSquads, setSelectedSquads] = React.useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = React.useState([]);

  const handleSquadChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSquads(typeof value === "string" ? value.split(",") : value);
  };

  const handleInstitutionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedInstitutions(
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Typography variant="h6">Filtros:</Typography>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="select-squad-label">Squad</InputLabel>
        <Select
          labelId="select-squad-label"
          multiple
          value={selectedSquads}
          onChange={handleSquadChange}
          input={<OutlinedInput label="Filtrar por Squad" />}
          renderValue={(selected) => selected.join(", ")}
          className={styles.select}
        >
          {squads.map((squad) => (
            <MenuItem key={squad} value={squad}>
              <Checkbox checked={selectedSquads.indexOf(squad) > -1} />
              <ListItemText primary={squad} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="select-institution-label">
          Instituição
        </InputLabel>
        <Select
          labelId="select-institution-label"
          multiple
          value={selectedInstitutions}
          onChange={handleInstitutionChange}
          input={<OutlinedInput label="Filtrar por Instituição" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {institutions.map((institution) => (
            <MenuItem key={institution} value={institution}>
              <Checkbox
                checked={selectedInstitutions.indexOf(institution) > -1}
              />
              <ListItemText primary={institution} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
