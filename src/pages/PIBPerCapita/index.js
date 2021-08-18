import React, { useState } from "react";
import { Grid, IconButton, makeStyles, Paper, Tooltip } from "@material-ui/core";
import createPlotlyComponent from 'react-plotly.js/factory';
import { valores, paises, valoresMediosMudiais, anos } from '../../data';
import Title from "../../Title";
import HelpIcon from '@material-ui/icons/Help';
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

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
    
    const [pais, setPais] = useState("Brazil");

    const handleChange = (event) => {
      setPais(event.target.value);
    };

    const gerarDadosPaisSelecionado = () => {
        return [
          {
            x: anos,
            y: anos.map(
              (ano) =>
                parseFloat(valores.find(
                  (valor) => valor.year === ano && valor.country === pais
                )?.gdppc ?? null).toFixed(2)
            ),
            trendline: anos.map(
              (ano) =>
                parseFloat(valoresMediosMudiais.find((valor) => valor.year === ano)?.gdppc ??
                null).toFixed(2)
            ),
            name: pais,
            marker: { color: "#0C7BDC" },
            type: "scatter"
          },
          {
            name: "Média mundial",
            x: valores.filter((v) => v.country === "Brazil").map((a) => a.year),
            y: valoresMediosMudiais.map((a) => parseFloat(a.gdppc).toFixed(2)),
            type: "lines",
            marker: { color: '#FFC20A' },
            line: {
              dash: "dot",
              width: 4
            }
          }
        ];
    };

    var layout = {
        xaxis: {
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)"
          },
          title: "Ano",
          titlefont: {
            size: 16,
            color: "rgb(107, 107, 107)"
          }
        },
        yaxis: {
          title: "PIB per capita",
          titlefont: {
            size: 16,
            color: "rgb(107, 107, 107)"
          },
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)"
          }
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: "rgba(255, 255, 255, 0)",
          bordercolor: "rgba(255, 255, 255, 0)"
        },
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1
    };

    return (
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Title>
                PIB per capita ao longo dos anos
                <Tooltip
                  title="Selecione um país no campo abaixo para visualizar o progresso do PIB per capita ao longo dos anos"
                  placement="bottom"
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Title>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  País
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={pais}
                  onChange={handleChange}
                >
                  {paises.map((pais, index) => (
                    <MenuItem key={index} value={pais}>{pais}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Nem todos os países possuem dados a serem exibidos
                </FormHelperText>
              </FormControl>
            </Grid>
            <Plot
              data={gerarDadosPaisSelecionado()}
              layout={layout}
              style={{ width: "calc(100% - 2px)", height: "50%" }}
            />
          </Paper>
        </Grid>
    </Grid>)
}