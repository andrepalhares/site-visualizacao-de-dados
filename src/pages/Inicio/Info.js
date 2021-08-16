import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../Title';

const useStyles = makeStyles({
  tituloInfo: {
    fontSize: '12px',
    flex: 1,
  },
});

export default function Info() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Os dados</Title>
      <Typography color="textSecondary" className={classes.tituloInfo}>
        Os dados utilizados neste trabalho estão presentes no dataset Country Socioeconomic Status Scores: 1880-2010, compilado por Shawn Dorius e disponibilizado no site <a target="_blank" rel="noreferrer" href="https://www.kaggle.com/sdorius/globses">Kaggle</a>. Nessa base de dados iniciais, diversos atributos foram encontrados e separados por países. São eles:
        <ul>
          <li>Ano em que a coleta de dados foi realizada</li>
          <li>SES: Valor do status socioeconômico dos países (um valor numérico que varia de 1 a 99)</li>
          <li>O produto interno per capita</li>
          <li>Quantidade média de anos de educação completos de pessoas com mais de 15 anos</li>
          <li>Total da população em %</li>
        </ul>
      </Typography>
    </React.Fragment>
  );
}
