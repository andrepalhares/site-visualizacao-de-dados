import React, { useState } from "react";
import createPlotlyComponent from 'react-plotly.js/factory';
import { valores, continentes, anos } from '../../data';
import Title from "../../Title";
import HelpIcon from '@material-ui/icons/Help';
import { FormHelperText, IconButton, MenuItem, Tooltip } from "@material-ui/core";
import { InputLabel, Select } from "@material-ui/core";
import _ from "lodash";

const Ranking = () => {
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);

    const [ano, setAno] = useState(2010);
    const [continente, setContinente] = useState("South America");

    const handleChange = (event) => {
        setAno(event.target.value);
    
    };

    const handleContinentChange = (event) => {
        setContinente(event.target.value);
    }

    const dados = _.orderBy(valores, ["SES"], ["asc"]);

    const data2 = [
        {
        name: "Brasil",
        y: dados
            .filter((v) => v.year === 2010 && v.continent === "South America")
            .map((a) => a.country),
        x: dados
            .filter((v) => v.year === 2010 && v.continent === "South America")
            .map((a) => a.SES),
        type: "bar",
        orientation: "h"
        }
    ];

  const gerarDadosAnoSelecionado = () => {
    return [
      data2,
      {
        y: _.orderBy(dados.filter(
            dado => 
              dado.continent === continente && dado.year === ano
          ), ["SES"], ["ASC"]).map(pais => pais.country),
        x: _.orderBy(dados.filter(
            dado => 
              dado.continent === continente && dado.year === ano
          ), ["SES"], ["ASC"]).map(pais => parseFloat(pais.SES).toFixed(2)),
        name: ano,
        marker: { color: "#FFC16F" },
        type: "bar",
        orientation: "h"
      }
    ];
  };

    return (
        <>
            <Title>
                Ranking do SES por continente e ano
                <Tooltip title="Selecione um ano e um continente para exibir os gráficos de barra" placement="bottom">
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            </Title>
            <div style={{ width: '50%' }}>

                <InputLabel id="demo-simple-select-helper-label">Ano</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={ano}
                    onChange={handleChange}
                >
                    {anos.map((ano) => (
                        <MenuItem value={ano}>{ano}</MenuItem>
                    ))}
                </Select>
                <br /><br />
                <InputLabel id="demo-simple-select-helper-label">Continente</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={continente}
                    onChange={handleContinentChange}
                >
                    {continentes.map((continente) => (
                    <MenuItem value={continente}>{continente}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    Nem todos os países possuem dados a serem exibidos
                </FormHelperText>
            </div>
        <Plot
            data={gerarDadosAnoSelecionado()}
            layout={{
                hovermode: 'closest',
                margin: {
                    l: 150,
                },
            }}
        />
      </>
    )
}

export default Ranking;