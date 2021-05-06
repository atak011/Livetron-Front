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
import Card from "../../components/Card/Card";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import { getLivecommerces } from "../LiveCommerce/Services/LiveCommerceService";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

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
  updated_at: string,
  start_date: string,
  estimated_end_date: string,
  estimated_visitor: string,
  visitor_limit: string,
  client_group: string,
  is_active: boolean,
  endtime: string,
  productivity: number
) {
  return {
    id,
    name,
    updated_at,
    start_date,
    estimated_end_date,
    estimated_visitor,
    visitor_limit,
    client_group,
    is_active,
    endtime,
    productivity
  };
}
export default function LivecommerceList() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [livecommerces, setLivecommerces] = useState<any[]>([]);

  const rows: any[] = [];
  React.useEffect(() => {
    const getLiveCommerceList = async () => {
      const livecommercesFromServer = await getLivecommerces();
      // console.log("from server", livecommercesFromServer);
      setLivecommerces(livecommercesFromServer);
    };

    getLiveCommerceList();
  }, []);

  livecommerces.map(item => {
    rows.push(
      createData(
        item.id,
        item.name,
        item.updated_at,
        item.start_date,
        item.estimated_end_date,
        item.estimated_visitor,
        item.visitor_limit,
        item.client_group,
        item.is_active,
        item.endtime,
        item.productivity
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
    <Grid>
      <Card additionalStyle={clsx(classes.filterCard)}>
        <div>
          <Typography variant="h5">Filtreler</Typography>
        </div>
        <form noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <TextField
              className={clsx(classes.commerceNameField)}
              id="outlined-basic"
              label="Etkinlik Adı"
              variant="outlined"
            />
            <TextField
              className={clsx(classes.templateNameField)}
              id="outlined-basic"
              label="Koleksiyon Adı"
              variant="outlined"
            />
            <Select
              className={clsx(classes.statusSelect)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              value={selectedStatus}
              onChange={onSelectedStatusChanged}
            >
              <MenuItem value={1}>AKTİF</MenuItem>
              <MenuItem value={0}>PASİF</MenuItem>
            </Select>
          </Grid>
        </form>
      </Card>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Live Stream Adı</TableCell>
              <TableCell align="right">Başlangıç Tarihi</TableCell>
              <TableCell align="right">Tahmini Bitiş Tarihi</TableCell>
              <TableCell align="right">Estimated Visitor</TableCell>
              <TableCell align="right">Visitor Limit</TableCell>
              <TableCell align="right">Client Group</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Bitiş Tarihi</TableCell>
              <TableCell align="right">Productivity</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Link to={{ pathname: "/live-commerces/" + row.id }}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.start_date}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.estimated_end_date}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.estimated_visitor}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.visitor_limit}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.client_group}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.is_active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.end_time ? row.end_time : "Belirtilmemiş"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.productivity}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Link to={{ pathname: "/live-commerce-edit-form/" + row.id }}>
                    Edit
                  </Link>
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
  );
}
