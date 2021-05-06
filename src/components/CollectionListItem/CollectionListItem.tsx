import React, { useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "../../components/Drawer/Drawer";
import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: 1
    }
  })
);

export default function CollectionListItem(props: any) {
  const { className, itemText, handleSelectedClick } = props;
  const classes = useStyles();

  return (
    <List dense className={classes.container}>
      <ListItem
        button
        onClick={() => {
          handleSelectedClick(itemText);
        }}
      >
        <ListItemText primary={itemText} />
        <ListItemSecondaryAction />
      </ListItem>
    </List>
  );
}
