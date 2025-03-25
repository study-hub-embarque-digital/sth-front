import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

export const ResponsiveTable = ({ columns, data }) => {
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: "auto" }}>
      <TableContainer
        sx={{ width: "100%", overflowX: "auto", maxWidth: "1200px" }}
      >
        <Table
          stickyHeader
          aria-label="tabela responsiva"
          sx={{ minWidth: "max-content", width: "100%" }}
        >
          <TableHead>
            <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
              {/* Linha de Filtros (Pesquisa + Selects) */}
              <TableCell
                colSpan={columns.length}
                sx={{ display: "flex", alignItems: "center", padding: 1 }}
              >
                {/* Campo de Pesquisa */}
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                    marginRight: 2, // Espaço entre o campo de pesquisa e os selects
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Pesquisar"
                    inputProps={{ "aria-label": "search" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>

                {/* Primeiro Select */}
                <FormControl sx={{ m: 1, minWidth: 300 }}>
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

                {/* Segundo Select */}
                <FormControl sx={{ m: 1, minWidth: 300 }}>
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
              </TableCell>
            </TableRow>

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
                      <TableCell
                        key={coluna.id}
                        align={coluna.align}
                        style={{
                          minWidth: coluna.minWidth,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {" "}
                        {coluna.format && typeof value === "number"
                          ? coluna.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
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
