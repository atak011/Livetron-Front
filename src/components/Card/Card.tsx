import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
        width: '45%',
        marginLeft: 20,
        alignItems: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard(props: any) {
    const { cardTitle, children, additionalStyle } = props;
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, additionalStyle)} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {cardTitle}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
}