import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import StudentProfile from './StudentProfile';
import "../App.css"


class Main extends Component {
  render() {
    return (
      <div className="main-panel">
          <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-10">
                <Router>
                  <Switch>
                      <Route path="/dashboard" component={StudentProfile} />
                      <Redirect from="*" to="/dashboard" />
                    </Switch>
                </Router>
              </div>
          </div>
      </div>
    );
  }
}

export default Main;
