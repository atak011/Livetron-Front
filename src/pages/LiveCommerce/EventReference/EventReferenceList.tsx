import React, { useState } from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Grid, MenuItem, Select, Typography } from "@material-ui/core";
import Card from "../../../components/Card/Card";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import { getEventRefLinks } from "../../LiveCommerce/Services/LiveCommerceService";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  },
  filterCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    height: "20%",
    marginLeft: 0,
    marginBottom: 20
  },
  commerceNameField: {
    marginTop: 15,
    width: 250
  },
  templateNameField: {
    marginTop: 15,
    marginLeft: 20,
    width: 250
  },
  statusSelect: {
    marginTop: 15,
    marginLeft: 20,
    width: 250,
    height: 50
  },
  link: {
    color: "#336699"
  }
});

function createData(
  id: number,
  name: string,
  code: string,
  promote: string,
  updated_at: string,
  participation: string
) {
  return {
    id,
    name,
    code,
    promote,
    updated_at,
    participation
  };
}
export default function EventReferenceList() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [eventRefLinks, setEventRefLinks] = useState<any[]>([]);

  const rows: any[] = [];
  React.useEffect(() => {
    const getEventRefLinkList = async () => {
      const eventRefLinksFromServer = await getEventRefLinks();
      console.log("eventlist from server", eventRefLinksFromServer);
      setEventRefLinks(eventRefLinksFromServer.data);
    };

    getEventRefLinkList();
  }, []);

  eventRefLinks.map(item => {
    rows.push(
      createData(
        item.id,
        item.name,
        item.code,
        item.promote,
        item.updated_at,
        item.participation
      )
    );
  });

  rows.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSelectedStatusChanged = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Event Reference Name</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Promote</TableCell>
                <TableCell align="right">Participants</TableCell>
                <TableCell align="right">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Link to={{ pathname: "/" + row.id }}>{row.name}</Link>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.code}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.promote ? "True" : "False"}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.participation}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Avatar alt="Cindy Baker" src={row.image} />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
