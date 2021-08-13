import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Plot from "react-plotly.js";
import { valores } from "./data.js";
import { IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export default function Chart() {
  const theme = useTheme();

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
        PIB per capita do Brasil
        <Tooltip title="Clique e arraste sobre um período no gráfico para dar zoom e clique na casinha para retornar à visualização inicial" placement="bottom">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Title>
      {/* <ResponsiveContainer> */}
        <Plot
          data={data}
          style={{width: '100%', height: '100%'}}
          // layout={{
          //   responsive: true,
          //   useResizeHandler: true,
          //   autosize: true,
          //   width: '100%',
          //   height: '100%'
          //   // title: "Completed years of education in the adult (15+) population"
          // }}
        />
        {/* <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart> */}
      {/* </ResponsiveContainer> */}
    </React.Fragment>
  );
}
