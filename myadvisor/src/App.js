import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StaffMain from './components/StaffMain';
import Main from './components/Main';
import './App.css';
import { Component } from "react";
import SignInSide from "./components/login";
import StudentProfile from "./components/StudentProfile";
import Career from "./components/Career";
import CourseDetails from "./components/CourseDetails";
import CourseList from "./components/CourseList";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/" component={Main} />
            <Route path="/staff" component={StaffMain} />
            <Route path="/login" component={SignInSide}/>
            <Route path="/home" component={StudentProfile}/>
            <Route path="/courses" component={CourseList} />
            <Route path="/coursedetails" component={CourseDetails} />
            <Route path="/career" component={Career} />
          </Switch>
        </Router>
    );
  }
}

export default App;
