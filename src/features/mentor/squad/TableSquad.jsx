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
import Button from "../../../components/buttons/Button";
import ModalSquad from "./ModalSquad";
import Skeleton from "@mui/material/Skeleton";

const TableSquad = ({ squads, loading }) => {
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
      <TableContainer component={Paper} style={{ cursor: "pointer" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Squad</StyledTableCell>
              <StyledTableCell align="center">Tipo</StyledTableCell>
              <StyledTableCell align="center">Empresa</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Skeleton variant="text" width={150} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" width={100} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" width={100} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="rectangular" width={120} height={40} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : squads.map((squad) => (
                  <StyledTableRow
                    key={squad.id}
                    onClick={() => handleRowClick(squad)}
                  >
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      style={{ color: "#6947db", fontWeight: "bold" }}
                    >
                      {squad.nome}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {squad.tipo}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {squad.empresaId}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button
                        handleMentoriaClick={() =>
                          handleMentoriaClick(squad.id)
                        }
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
