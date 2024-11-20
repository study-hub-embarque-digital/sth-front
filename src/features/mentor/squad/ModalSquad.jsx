import * as React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Squad.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
};

const ModalSquad = ({ onClose, open, squad }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Detalhes do Squad {squad.nome}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Alunos: {squad.alunos}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Entregas: {squad.entregas}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Instituição: {squad.instiruicao}
        </Typography>

        <div className={styles.demoDay}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 3 }}
            className={styles.demoDayButton}
            onClick={() => {
              console.log(`Adicionar ${squad.squad} ao DemoDay`);
            }}
          >
            Adicionar ao DemoDay
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalSquad;
