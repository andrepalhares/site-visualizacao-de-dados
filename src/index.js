import React from 'react';
import { render } from 'react-dom';
import Inicio from './pages/Inicio';
import FormacaoAcademica from './pages/FormacaoAcademica';
import PopulacaoMundial from './pages/PopulacaoMundial';
import SES from './pages/SES';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from './layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={Inicio} exact />
        <Route path="/ses" component={SES} exact />
        <Route path="/pib-per-capita" component={() => (<h1>PIB per capita</h1>)} exact />
        <Route path="/formacao-academica" component={FormacaoAcademica} exact />
        <Route path="/populacao" component={PopulacaoMundial} exact />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));