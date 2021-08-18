import React from "react";
import { Grid, IconButton, makeStyles, Paper, Tooltip } from "@material-ui/core";
import createPlotlyComponent from 'react-plotly.js/factory';
import { valores } from '../../data';
import Title from "../../Title";
import HelpIcon from '@material-ui/icons/Help';

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

export default function PIBPerCapita() {
    const classes = useStyles();
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);

    const anos = [1980, 1990, 2000, 2010];

    var xData = anos;

    var yData = anos.map((ano) => {
        const anuais = valores.filter(valor => valor.year === ano && valor.gdppc)
        
        return anuais.map(t => parseFloat(t.gdppc.toFixed(2)))
    })
    
    var zData = anos.map((ano) => {
        const anuais = valores.filter(valor => valor.year === ano && valor.gdppc)
        
        return anuais.map(t => t.country)
    })
    
    var data = [];

    for ( var i = 0; i < xData.length; i ++ ) {
        var result = {
            type: 'box',
            y: yData[i],
            z: zData[i],
            name: xData[i],
            hovertext: zData[i],
            boxpoints: 'all',
            jitter: 0.5,
            whiskerwidth: 0.2,
            fillcolor: 'cls',
            marker: {
                size: 5
            },
            line: {
                width: 1
            }
        };
        data.push(result);
    };

    var layout = {
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinewidth: 2
        },
        margin: {
            l: 40,
            r: 30,
            b: 80,
            t: 100
        },
        paper_bgcolor: 'rgb(243, 243, 243)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <Title>
                        Anos de formação acadêmica completos de pessoas com mais de 15 anos
                        <Tooltip title="Clique e arraste para aproximar em um período no gráfico" placement="bottom">
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Title>
                </Grid>
                    <Plot 
                        data={data} 
                        layout={layout}
                        style={{ width: 'calc(100% - 10px)' }} />
                </Paper>
            </Grid>
        </Grid>
    )
}