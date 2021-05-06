import React, { useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from '../../components/Drawer/Drawer'
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: '#293245',
        },
    })
);

export default function AdminPanel(props: { className?: string }) {
    const classes = useStyles();

    return (
        <Grid className={clsx(classes.container)}>
            <Drawer />
        </Grid>
    );
}
