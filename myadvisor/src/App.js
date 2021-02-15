import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StaffMain from './components/StaffMain';
import Main from './components/Main';
import './App.css';
import { Component } from "react";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/" component={StaffMain} />
          </Switch>
        </Router>
    );
  }
}

export default App;
