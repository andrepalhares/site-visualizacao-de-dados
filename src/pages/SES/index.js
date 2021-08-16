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

export default function SES() {
    const classes = useStyles();
    const Plotly = window.Plotly;
    const Plot = createPlotlyComponent(Plotly);

    const dados = valores.filter(valor => valor.year === 2010 
        && valor.yrseduc !== '' && valor.SES > 0 && valor.continent !== '')

    var valoresAsia = {
        x: dados.filter(d => d.continent === 'Asia').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'Asia').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'Asia',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'Asia').map(dado => dado.country),
        marker: { size: 12, color: '#332288' }
    };
    var valoresEuropa = {
        x: dados.filter(d => d.continent === 'Europe').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'Europe').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'Europa',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'Europe').map(dado => dado.country),
        marker: { size: 12, color: '#44AA99' }
    };
    var valoresAfrica = {
        x: dados.filter(d => d.continent === 'Africa').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'Africa').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'Africa',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'Africa').map(dado => dado.country),
        marker: { size: 12, color: '#88CCEE' }
    };
    var valoresOceania = {
        x: dados.filter(d => d.continent === 'Oceania').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'Oceania').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'Oceania',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'Oceania').map(dado => dado.country),
        marker: { size: 12, color: '#DDCC77' }
    };
    var valoresAmericaNorte = {
        x: dados.filter(d => d.continent === 'North America').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'North America').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'América do Norte',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'North America').map(dado => dado.country),
        marker: { size: 12, color: '#CC6677' }
    };
    var valoresAmericaSul = {
        x: dados.filter(d => d.continent === 'South America').map(dado => dado.SES.toFixed(1)),
        y: dados.filter(d => d.continent === 'South America').map(dado => dado.yrseduc.toFixed(1)),
        mode: 'markers',
        type: 'scatter',
        name: 'América do Sul',
        hovertemplate: 
            '<b>%{text}</b><br><br>' +
            '<b>Status socio-econômico</b>: %{x}' +
            '<br><b>Anos de formação acadêmica</b>: %{y}<br>',
        text: dados.filter(d => d.continent === 'South America').map(dado => dado.country),
        marker: { size: 12, color: '#AA4499' }
    };
      
    var data = [ valoresAsia, valoresEuropa, valoresAfrica, valoresOceania, valoresAmericaNorte, valoresAmericaSul ];
      
    var layout = {
        hovermode: 'closest',
        xaxis: {
            title: 'SES (Status socio-econômico)',
            range: [ 0, 100 ]
          },
        yaxis: {
            title: 'Anos de formação acadêmica',
            range: [0, 13.5]
        },
        annotations: [
            {
              xref: 'paper',
              yref: 'paper',
              x: 0,
              y: -0.125,
              text: 'Informações sobre o continente de cada país retirada do site <a target="_blank" rel="noreferrer" href="https://datahub.io/JohnSnowLabs/country-and-continent-codes-list#data">John Snow Labs GeoNames</a> (Acesso em 15 agosto 2021)',
              showarrow: false,
              font:{
                family: 'Arial',
                size: 10,
                color: 'rgb(150,150,150)'
              }
            }
        ]        
    };
      

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <Title>
                        Porcentagem da população mundial por país (2010)
                        <Tooltip title="Clique em um ou mais itens na legenda para esconder continentes do gráfico e passe o mouse sobre os pontos para ver detalhes" placement="bottom">
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Title>
                </Grid>
                <Grid item xs={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Plot 
                        data={data} 
                        layout={layout} 
                        style={{ width: 'calc(100% - 2px)', height: '200%' }} />
                </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}