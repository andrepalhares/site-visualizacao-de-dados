import React, { useState } from "react";
import { FormControl, FormLabel, Grid, IconButton, FormControlLabel, makeStyles, Paper, RadioGroup, Radio, Tooltip } from "@material-ui/core";
import createPlotlyComponent from 'react-plotly.js/factory';
import { valores, anos, paises } from '../../data';
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
    opcao: {
        "& svg": {
          width: "0.75em",
          height: "0.75em"
        },
    },
    label: {
        fontSize: '0.875rem'
    }
}));

export default function PopulacaoMundial() {
    const classes = useStyles();
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);
    const [ano, setAno] = useState('2010');

    const handleChange = (event) => {
      setAno(event.target.value);
    };
  
    const gerarDadosMapaAnoSelecionado = () => {
      return [
        {
          type: "choropleth",
          locationmode: "country names",
          locations: paises,
          z: paises.map(
            (pais) =>
              parseFloat(valores.find(
                (valor) => valor.year === parseInt(ano) && valor.country === pais
              )?.popshare).toFixed(4) ?? null
          ),
          autocolorscale: true
        }
      ];
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <Title>
                        Porcentagem da população mundial ao longo dos anos {ano}
                        <Tooltip title="Use o scroll para dar zoom-in e zoom-out no mapa" placement="bottom">
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Title>
                    <Grid container direction="row" align="space-between" justifyContent="center">
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Ano</FormLabel>
                                <RadioGroup aria-label="ano" name="ano" value={ano} onChange={handleChange} row>
                                    {anos.map((ano, index) => (
                                        <FormControlLabel 
                                            classes={{ label: classes.label }}
                                            value={ano?.toString()} 
                                            key={index} 
                                            control={<Radio color="primary" />} 
                                            label={ano}
                                            className={classes.opcao}
                                         />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid container align="center" justifyContent="center">
                            <Grid item>
                                <Plot
                                    data={gerarDadosMapaAnoSelecionado()}
                                    layout={{
                                        geo: {
                                            projection: {
                                                type: "robinson"
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>)
}