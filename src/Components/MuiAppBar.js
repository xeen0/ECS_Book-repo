import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  fade,
  makeStyles,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { ImCart } from "react-icons/im";

import { AppContext } from "../Context/AppContext";
import { MuiPopOver } from "../Components";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    borderWidth: "1px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "50%",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function MuiAppBar() {
  const classes = useStyles();
  const { DBooks, setBooks, SelectedBooks } = useContext(AppContext);
  const [Search, setSearch] = useState("");
  const [SearchBy, setSearchBy] = useState("title");
  const searchFilterFunction = (text) => {
    const newData = DBooks.filter((item) => {
      const itemData = `${item[`${SearchBy}`].toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearch(text);
    setBooks(newData);
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static" variant="outlined" color="default">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Book Store
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              fullWidth
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => searchFilterFunction(e.target.value)}
              value={Search}
            />
          </div>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="title"
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <FormControlLabel
              value="title"
              control={<Radio color="secondary" />}
              label="Title"
            />
            <FormControlLabel
              value="authors"
              control={<Radio color="secondary" />}
              label="Authors"
            />
          </RadioGroup>

          <div className={classes.grow} />
          <div>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Link to="/Checkout" style={{ textDecoration: "none" }}>
                {SelectedBooks.length > 0 ? (
                  <MuiPopOver>
                    <Badge
                      badgeContent={`${SelectedBooks.length}`}
                      color="secondary"
                    >
                      <ImCart />
                    </Badge>
                  </MuiPopOver>
                ) : (
                  <Badge color="secondary">
                    <ImCart />
                  </Badge>
                )}
              </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
