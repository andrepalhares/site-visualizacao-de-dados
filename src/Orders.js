import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
// import Plot from "react-plotly.js";
// import { valores } from "./data.js";
import { IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import createPlotlyComponent from 'react-plotly.js/factory';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const Plotly = window.Plotly;
  const Plot = createPlotlyComponent(Plotly);

  return (
    <React.Fragment>
      <Title>
        Anos de educação completos de pessoas com mais de 15 anos
        <Tooltip title="Use o scroll para dar zoom-in e zoom-out no mapa" placement="bottom">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Title>
      <Plot
        data={[
          {
            type: "choropleth",
            locationmode: "country names",
            locations: valores
              .filter((v) => v.year === 2010)
              .map((a) => a.country),
            z: valores.filter((v) => v.year === 2010).map((a) => a.yrseduc),
            autocolorscale: true
          }
        ]}
        layout={{
          geo: {
            projection: {
              type: "robinson"
            }
          }
        }}
      />
    </React.Fragment>
  );
}
