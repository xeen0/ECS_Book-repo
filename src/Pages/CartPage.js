import { Button, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import {MuiCheckOutTable }from '../Components'

const useStyles = makeStyles({
  title: {
    margin: "auto ",
    fontFamily: `'Balsamiq Sans'`,
  },
});
export const CartPage = () => {
  const classes = useStyles();
  return (
    <div>
      <MuiCheckOutTable />
      <Link to="/Page1" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          <Typography className={classes.title}>Shop More</Typography>
        </Button>
      </Link>
    </div>
  );
};

