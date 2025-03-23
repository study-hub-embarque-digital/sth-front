import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: "auto" }}>
      <TableContainer sx={{ width: "100%", overflowX: "auto" , maxWidth:'1200px'}}>
        <Table
          stickyHeader
          aria-label="tabela responsiva"
          sx={{ minWidth: "max-content", width: "100%" }}
        >
          <TableHead>
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
