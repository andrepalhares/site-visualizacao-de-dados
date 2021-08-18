import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Scatterplot from "././Scatterplot";
import GraficoBarras from "././GraficoBarras";
import Ranking from "./Ranking";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 440,
    },
}));

export default function SES() {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <GraficoBarras />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Scatterplot />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Ranking />
                </Paper>
            </Grid>
        </Grid>
    )
}