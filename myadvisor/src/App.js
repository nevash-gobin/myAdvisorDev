import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StaffMain from './components/StaffMain';
import Main from './components/Main';
import './App.css';
import { Component } from "react";
import SignInSide from "./components/login";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/" component={StaffMain} />
            <Route path="/login" component={SignInSide}/>
          
          </Switch>
        </Router>
    );
  }
}

export default App;
