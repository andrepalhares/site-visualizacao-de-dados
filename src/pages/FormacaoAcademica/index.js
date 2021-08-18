import React, { useState } from "react";
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Tooltip } from "@material-ui/core";
import createPlotlyComponent from 'react-plotly.js/factory';
import { valores, valoresMediosMudiais, anos, paisesFormacaoAcademica } from '../../data';
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

export default function FormacaoAcademica() {
    const classes = useStyles();
    const [pais, setPais] = useState('Brazil');
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);

    const handleChange = (event) => {
        setPais(event.target.value);
    };

    const mundo = {
        x: anos,
        y: valoresMediosMudiais.map(val => val.yrseduc),
        name: 'Média mundial',
        marker: {
            color: '#E1BE6A'
        },
        type: 'bar'
    };

    const gerarDadosPaisSelecionado = () => {
        return [mundo, {
            x: anos,
            y: anos.map(ano => valores.find(valor => valor.year === ano && valor.country === pais)?.yrseduc ?? null),
            name: pais,
            marker: {color: '#40B0A6'},
            type: 'bar'
        }];
    }
      
    var layout = {
        xaxis: {
            tickfont: {
                size: 14,
                color: 'rgb(107, 107, 107)'
          },
          title: 'Ano',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
        },
        yaxis: {
          title: 'Anos de formação acadêmica',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <Title>
                        Anos de formação acadêmica completos de pessoas com mais de 15 anos
                        <Tooltip title="Selecione um país no campo abaixo para visualizar o comparativo com a média mundial" placement="bottom">
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Title>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={handleChange}
                            defaultValue = "Brazil"
                        >
                            {paisesFormacaoAcademica.map((pais, index) => (
                                <MenuItem key={index} value={pais}>{pais}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Nem todos os países possuem dados a serem exibidos</FormHelperText>
                    </FormControl>
                </Grid>
                    <Plot 
                        data={gerarDadosPaisSelecionado()} 
                        layout={layout} 
                        style={{ width: 'calc(100% - 2px)', height: '50%' }} />
                </Paper>
            </Grid>
        </Grid>
    )
}