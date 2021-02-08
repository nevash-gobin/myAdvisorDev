import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './components/Main';
import './App.css';
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
