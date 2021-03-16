import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Main from './components/Main';

import './App.css';
import PermanentDrawerRight from "./components/sidebar";

function App () {

  return (
      <Router>
        <PermanentDrawerRight/>
        <Switch>
          <Route
            path="/"
            render={(props) => <Main {...props} />}
          />
        </Switch>
      </Router>
  );
}

export default App;
