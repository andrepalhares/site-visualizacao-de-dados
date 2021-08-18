import { FormControl, FormHelperText, Grid, MenuItem, Select, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import Title from "../../Title";
import createPlotlyComponent from 'react-plotly.js/factory';
import { IconButton } from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import { valores, valoresMediosMudiais, anos, paises } from '../../data';
import { InputLabel } from "@material-ui/core";

const GraficoBarras = () => {
    const [pais, setPais] = useState('Brazil');
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);

    const handleChange = (event) => {
        setPais(event.target.value);
    };

    const mundo = {
        x: anos,
        y: valoresMediosMudiais.map(val => parseFloat(val.SES).toFixed(2)),
        name: 'Média mundial',
        marker: {
            color: '#FEFE62'
        },
        type: 'bar'
    };

    const gerarDadosPaisSelecionado = () => {
        return [mundo, {
            x: anos,
            y: anos.map(ano => parseFloat(valores.find(valor => valor.year === ano && 
                valor.country === pais)?.SES ?? null).toFixed(2)),
            name: pais,
            marker: {color: '#E4A7D6'},
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
          title: 'SES (Status socioeconômico)',
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
          y: 1.2,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
    };

    return (
        <>
            <Grid item xs={12}>
                <Title>
                    SES (status socioeconômico), por país, ao longo dos anos
                    <Tooltip title="Selecione um país no campo abaixo para visualizar o comparativo com a média mundial" placement="bottom">
                        <IconButton>
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                </Title>
                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={handleChange}
                        defaultValue = "Brazil"
                    >
                        {paises.map((pais, index) => (
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
        </>
    );
}

export default GraficoBarras;