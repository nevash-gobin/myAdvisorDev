import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

//Student Imports
import StudentProfile from './StudentProfile';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import Career from './Career';
import Start from './Start';
import PermanentDrawerRight from "./sidebar";

//Staff Imports
import StaffDashboard from './Staff/StaffDashboard';
import StaffCourses from './Staff/Courses';
import Students from './Staff/Students';
import Settings from './Staff/Settings';
import Reports from './Staff/Reports';
import Programmes from './Staff/Programmes';

//Global Imports
import "../App.css"
import "../assets/css/Staff.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./login";
import TopBar from '../components/TopBar';
import ReactWebChat from "../components/Bot Framework/webChat";

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("auth"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [recCourses, setRecCourses] = useState(null);
  const [show, setShow] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const setType = (value) => {
    setUser(value);
  };

  const setRecommended = (value) => {
    setRecCourses(value);
  };

  const setDisplay = (value) => {
    setShow(value);
  };

  return (
    <div className="main-panel">
      {user ? <TopBar></TopBar> : null}
      {user == "student" ? <PermanentDrawerRight recCourses={recCourses} show={show} setDisplay={setDisplay}/> : null}
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return(<Redirect to="/home"/>)
              } else if (isAuthenticated && user=="admin"){
                return(<Redirect to="/staff"/>)
              } else {
                return(<Redirect to="/login" />)
              }
            }
          }
        />

        <Route
          exact
          path="/login"
          render={(props) =>
            {
              if(!isAuthenticated){
                return <Login {...props} setAuth={setAuth} setType={setType}/>
              } else if (isAuthenticated && user=="admin"){
                return(<Redirect to="/staff" />)
              } else if (isAuthenticated && user=="student"){
                return(<Redirect to="/home" />)
              }
            }
          }
        />

        {/*Student Routes*/}

        <Route
          exact
          path="/home"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <StudentProfile {...props} setRecommended={setRecommended} setDisplay={setDisplay}/>
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/courses"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <CourseList {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/coursedetails"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <CourseDetails {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/career"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <Career {...props} setDisplay={setDisplay} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/start"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <Start {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />   

        {/*Bot Route*/}
        <Route
          exact
          path="/bot"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <ReactWebChat {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />  


        {/*Staff Routes*/}
        <Route
          exact
          path="/staff"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <StaffDashboard {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />        

        <Route
          exact
          path="/staff/courses"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <StaffCourses {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/staff/programmes"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <Programmes {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/staff/students"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <Students {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/staff/settings"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <Settings {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />
        
        <Route
          exact
          path="/staff/reports"
          render={(props) =>
            {
              if(isAuthenticated && user=="admin"){
                return <Reports {...props} />
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />                        




      </Switch>

    </div>
  );
}

export default Main;
