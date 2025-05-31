import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, Button
} from "@mui/material";
import axios from "axios";

type Props = {
  date: string;
  onClose: () => void;
  mentoriaId: string;
};

export const EncontroModal: React.FC<Props> = ({ date, onClose, mentoriaId }) => {
  const [horario, setHorario] = useState("");
  const [link, setLink] = useState("");
  const [plataforma, setPlataforma] = useState("");

  const handleSave = () => {
    axios.post(`/api/encontros/${mentoriaId}`, {
      data: date,
      horario,
      linkReuniao: link,
      plataforma
    })
    .then(() => {
      onClose();
    })
    .catch(err => {
      console.error("Erro ao salvar encontro:", err);
    });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Adicionar detalhes do encontro ({date})</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Horário"
          type="time"
          value={horario}
          onChange={e => setHorario(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Link da Reunião"
          value={link}
          onChange={e => setLink(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Plataforma"
          value={plataforma}
          onChange={e => setPlataforma(e.target.value)}
          margin="normal"
        >
          {["ZOOM", "MEET", "TEAMS"].map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
