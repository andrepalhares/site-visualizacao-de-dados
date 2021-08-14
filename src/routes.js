import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Dashboard from "./Dashboard";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Dashboard }  path="/" exact />
           <Route component = { Dashboard }  path="/sobre" />
           <Route component = { Dashboard }  path="/usuario" />
       </BrowserRouter>
   )
}

export default Routes;
