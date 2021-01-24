import React, { useContext } from "react";
import {
  makeStyles,
  Typography,
  Popover,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { AppContext } from "../Context/AppContext";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export function MuiPopOver(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { Books, SelectedBooks } = useContext(AppContext);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {props.children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {SelectedBooks.map((bookID, index) => {
          const book = Books.find((p) => {
            if (p.bookID === bookID) return p;
          });
          return (
            <List key={index}>
              <ListItem>
                <ListItemText>{book.title}</ListItemText>
              </ListItem>
              <Divider />
            </List>
          );
        })}
      </Popover>
    </div>
  );
}
