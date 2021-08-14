import React from 'react';
import { render } from 'react-dom';
import Inicio from './pages/Inicio';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from './layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={Inicio} exact />
        <Route path="/ses" component={() => (<h1>Status socioeconômico</h1>)} exact />
        <Route path="/pib-per-capita" component={() => (<h1>Pib per capita</h1>)} exact />
        <Route path="/formacao-academica" component={() => (<h1>Formação acadêmica</h1>)} exact />
        <Route path="/populacao" component={() => (<h1>População mundial</h1>)} exact />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));