import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import Button from "../../../components/buttons/Button";
import ModalSquad from "./ModalSquad";

const TableSquad = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedSquad, setSelectedSquad] = React.useState(null);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(squad, alunos, entregas, instituicao, id) {
    return { squad, alunos, entregas, instituicao, id };
  }

  const rows = [
    createData("Squad A", 25, "Entrega 1", "Unicap", 1),
    createData("Squad B", 30, "Entrega 2", "Senac", 2),
    createData("Squad C", 22, "Entrega 3", "Cesár", 3),
    createData("Squad D", 28, "Entrega 4", "Senac", 4),
    createData("Squad E", 18, "Entrega 5", "Unicap", 5),
  ];

  const handleRowClick = (squad) => {
    setSelectedSquad(squad);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSquad(null);
  };

  const handleMentoriaClick = (id) => {
    navigate(`/mentor/mentoria/${id}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Squad</StyledTableCell>
              <StyledTableCell align="right">Alunos</StyledTableCell>
              <StyledTableCell align="right">Entregas</StyledTableCell>
              <StyledTableCell align="right">Instituição</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.squad}
                onClick={() => handleRowClick(row)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.squad}
                </StyledTableCell>
                <StyledTableCell align="right">{row.alunos}</StyledTableCell>
                <StyledTableCell align="right">{row.entregas}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.instituicao}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    handleMentoriaClick={() => handleMentoriaClick(row.id)}
                    name={"Ver mentoria"}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedSquad && (
        <ModalSquad
          open={openModal}
          onClose={handleCloseModal}
          squad={selectedSquad}
        />
      )}
    </>
  );
};

export default TableSquad;
