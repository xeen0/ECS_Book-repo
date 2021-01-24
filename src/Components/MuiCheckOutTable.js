import React, { useContext } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Input,
} from "@material-ui/core";
import { MdDelete } from "react-icons/md";

import { AppContext } from "../Context/AppContext";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export function MuiCheckOutTable() {
  const classes = useStyles();
  const { SelectedBooks, Books, setBooks, setSelectedBooks } = useContext(
    AppContext
  );
  const handleCheckOut = () => {
    if (SelectedBooks.length === 0) alert("Please Select atleast one book");
    else {
      alert(
        "Your order is been taken , Total Price payed : " +
          subtotal(SelectedBooks)
      );
      const d = Books.map((b) => {
        return {
          ...b,
          Qty: 1,
        };
      });
      setBooks(d);
      setSelectedBooks([]);
    }
  };
  function subtotal(items) {
    return items
      .map((bookID) => {
        const bb = Books.find((b) => {
          if (b.bookID === bookID) return b;
        });
        return bb.Qty * bb.price;
      })
      .reduce((sum, i) => sum + i, 0);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">Unit</TableCell>
            <TableCell align="center">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SelectedBooks.map((bookID, index) => {
            const book = Books.find((p) => {
              if (p.bookID === bookID) return p;
            });
            return (
              <TableRow key={book.bookID}>
                <TableCell>{book.title}</TableCell>
                <TableCell align="center">
                  <Input
                    type="number"
                    value={book.Qty}
                    onChange={(e) => {
                      const d = Books.map((b) => {
                        if (b.bookID !== bookID || e.target.value == 0) return b;
                        return {
                          ...b,
                          Qty: e.target.value,
                        };
                      });
                      setBooks(d);
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <MdDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      let newSelected = [];
                      newSelected = newSelected.concat(
                        SelectedBooks.slice(0, index),
                        SelectedBooks.slice(index + 1)
                      );
                      setSelectedBooks(newSelected);
                    }}
                  />
                </TableCell>

                <TableCell align="center">{book.price}</TableCell>
                <TableCell align="center">{book.Qty * book.price}</TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell rowSpan={7} />
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="center">{subtotal(SelectedBooks)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sm={2} />

            <TableCell align="right">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCheckOut}
              >
                Check Out
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
