import React from 'react';
import Title from '../../Title';
import { valores } from "../../data.js";
import { IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import createPlotlyComponent from 'react-plotly.js/factory';
import { ResponsiveContainer } from 'recharts';

export default function PIBPerCapitaBrasil() {
  const Plotly = window.Plotly;
  const Plot = createPlotlyComponent(Plotly);

  const data = [
    {
      name: "Brasil",
      x: valores.filter((v) => v.country === "Brazil").map((a) => a.year),
      y: valores.filter((v) => v.country === "Brazil").map((a) => a.gdppc),
      type: "scatter"
    }
  ];

  return (
    <React.Fragment>
      <Title style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        PIB per capita do Brasil;
        <Tooltip title="Clique e arraste sobre um período no gráfico para dar zoom e clique na casinha para retornar à visualização inicial" placement="bottom">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Title>
        <ResponsiveContainer>
          <Plot
            data={data}
            style={{width: '100%', height: '100%'}}
          />
        </ResponsiveContainer>
    </React.Fragment>
  );
}
