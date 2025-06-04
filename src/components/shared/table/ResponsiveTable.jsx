import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
} from "@mui/material";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../../contexts/AuthContext";

export const ResponsiveTable = ({
  columns,
  data,
  idProperty,
  onClickDetails,
  textButton,
  onClickAdd,
  hasPermission,
  filtroIdade,
  filtroStatus,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        margin: !isMobile ? "auto" : "10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      {hasPermission && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            endIcon={<AddRoundedIcon />}
            onClick={onClickAdd}
          >
            {textButton}
          </Button>
        </Box>
      )}

      {/* Filtros e pesquisa */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Campo de pesquisa */}
        <FormControl sx={{ flex: 2 }} variant="outlined">
          <InputLabel htmlFor="search-input">Pesquisar</InputLabel>
          <OutlinedInput
            id="search-input"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Pesquisar"
          />
        </FormControl>

        {!filtroIdade && (
          <>
            {/* Filtro por idade */}
            <FormControl sx={{ flex: 1, minWidth: 120 }}>
              <InputLabel id="select-age-label">Idade</InputLabel>
              <Select
                labelId="select-age-label"
                value={age}
                onChange={handleChange}
                label="Idade"
              >
                <MenuItem value={20}>Vinte</MenuItem>
                <MenuItem value={21}>Vinte e um</MenuItem>
                <MenuItem value={22}>Vinte e dois</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {!filtroStatus && (
          <>
            {/* Filtro por status */}
            <FormControl sx={{ flex: 1, minWidth: 120 }}>
              <InputLabel id="select-status-label">Status</InputLabel>
              <Select
                labelId="select-status-label"
                value={status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value={1}>Ativo</MenuItem>
                <MenuItem value={0}>Inativo</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </Box>

      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table aria-label="tabela responsiva" sx={{ width: "100%" }}>
          <TableHead>
            {/* Cabeçalho das colunas */}
            <TableRow>
              {columns.map((coluna) => (
                <TableCell
                  key={coluna.id}
                  align={coluna.align}
                  style={{ minWidth: coluna.minWidth }}
                >
                  {coluna.label}
                </TableCell>
              ))}
              <TableCell align="center">Detalhes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((coluna) => {
                    const value = item[coluna.id];
                    return (
                      <TableCell key={coluna.id} align={coluna.align}>
                        {" "}
                        {coluna.format && typeof value === "number"
                          ? coluna.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      sx={{
                        borderRadius: "5px",
                        padding: "10px 20px",
                        backgroundColor: (theme) =>
                          theme.palette.secondary.main,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.secondary.dark,
                        },
                      }}
                      onClick={() => onClickDetails(item[idProperty])}
                    >
                      <SubdirectoryArrowRightRoundedIcon
                        sx={{ color: "#fff" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
