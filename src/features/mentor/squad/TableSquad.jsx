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
              <StyledTableCell>Squad</StyledTableCell>
              <StyledTableCell align="right">Tipo</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <Skeleton variant="text" width={150} />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Skeleton variant="text" width={100} />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Skeleton variant="rectangular" width={120} height={40} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : squads.map((squad) => (
                  <StyledTableRow
                    key={squad.id}
                    onClick={() => handleRowClick(squad)}
                  >
                    <StyledTableCell component="th" scope="row">
                      {squad.nome}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {squad.tipo}
                    </StyledTableCell>
                    <StyledTableCell align="right">
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
