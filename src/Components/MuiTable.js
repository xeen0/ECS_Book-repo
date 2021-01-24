import React, { useContext, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableContainer,
  Checkbox,
  makeStyles,
  lighten,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";

import { AppContext } from "../Context/AppContext";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const MuiTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useToolbarStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" className={classes.title}>
          SELECT
        </TableCell>
        <TableCell align="center" className={classes.title}>
          TITLE
        </TableCell>
        <TableCell align="center" className={classes.title}>
          AUTHORS
        </TableCell>
        <TableCell align="center" className={classes.title}>
          LANGUAGE
        </TableCell>
        <TableCell
          align="center"
          sortDirection={orderBy === "average_rating" ? order : false}
          className={classes.title}
        >
          <TableSortLabel
            active={orderBy === "average_rating"}
            direction={orderBy === "average_rating" ? order : "asc"}
            onClick={createSortHandler("average_rating")}
          >
            RATING
          </TableSortLabel>
        </TableCell>
        <TableCell align="center" className={classes.title}>
          RATINGS
        </TableCell>

        <TableCell
          align="center"
          sortDirection={orderBy === "price" ? order : false}
          className={classes.title}
        >
          <TableSortLabel
            active={orderBy === "price"}
            direction={orderBy === "price" ? order : "asc"}
            onClick={createSortHandler("price")}
          >
            PRICE
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export const MuiTable = () => {
  const classes = TableStyles();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(20);
  const { Books, SelectedBooks, setSelectedBooks } = useContext(AppContext);

  const isSelected = (bookID) => SelectedBooks.indexOf(bookID) !== -1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleClick = (event, bookID) => {
    const selectedIndex = SelectedBooks.indexOf(bookID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(SelectedBooks, bookID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(SelectedBooks.slice(1));
    } else if (selectedIndex === SelectedBooks.length - 1) {
      newSelected = newSelected.concat(SelectedBooks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        SelectedBooks.slice(0, selectedIndex),
        SelectedBooks.slice(selectedIndex + 1)
      );
    }

    setSelectedBooks(newSelected);
    console.log(SelectedBooks);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <MuiTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {stableSort(Books, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book, index) => {
                  const isItemSelected = isSelected(book.bookID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, book.bookID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={book.bookID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {book.title}
                      </TableCell>
                      <TableCell align="center">{book.authors}</TableCell>
                      <TableCell align="center">{book.language_code}</TableCell>
                      <TableCell align="center">
                        <Rating
                          name="read-only"
                          value={book.average_rating}
                          readOnly
                        />
                      </TableCell>
                      <TableCell align="center">{book.ratings_count}</TableCell>
                      <TableCell align="center">{book.price}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          component="div"
          count={Books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};


const TableStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(0),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
