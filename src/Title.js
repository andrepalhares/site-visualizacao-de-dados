import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  titulo: {
    color: '#107869'
  }
}))

export default function Title(props) {
  const classes = useStyles();

  return (
    <Typography component="h2" variant="h6" className={classes.titulo} gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
