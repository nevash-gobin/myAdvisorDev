import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

//Student Imports
import StudentProfile from './StudentProfile';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import Career from './Career';
import Start from './Start';
import BeforeBot from './BeforeBot';
import Finish from './Finish';
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
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("auth")); // Get authenticated status from localStorage
  const [user, setUser] = useState(localStorage.getItem("user")); // Get type of user from localStorage
  const [recCourses, setRecCourses] = useState(null); // Store recommended courses generated on StudentProfile.js
  const [careerRecCourses, setCareerRecCourses] = useState(null); // Store recommended courses generated on Career.js
  const [chosenCourses, setChosenCourses] = useState([]); // Store courses chosen by the user on CourseList.js
  const [show, setShow] = useState(true); // Boolean value to determine whether or not to show the "Begin Advising" button
  const [progress, setProgress] = useState(0); // Value of the user's advising progress percentage
  const [degProgress, setDegProgress] = useState(0); // Value of the user's degree progress percentage
  const [newDeg, setNewDeg] = useState(0); // Value of the user's updated degree progress credits
  const [credits, setCredits] = useState(0); // Value of how much credits the user needs to complete their degree
  const [hide, setHide] = useState(false); // Boolean value to determine whether or not to show the sidebar or not
  const [showBackBtn, setShowBackBtn] = useState(true); // Boolean value to determine whether or not to show the back button on the course list page
  const [loading, setLoading] = useState(true); // Boolean value to determine whether or not to show a loading circle on the sidebar
  const [year, setYear] = useState(1); // Value of the user's current level
  const [warning, setWarning] = useState(false); // Boolean value to indicate whether or not that the user is on academic warning
  const [botButtons, setBotButtons] = useState(false); // Boolean value to indicate whether or not to show "Back to Courses" and "Finish Advising" buttons on sidebar
  const [programme, setProgramme] = useState(null); // Store what programme a student is current doing

  /* Setter methods for use by the other pages */
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const setType = (value) => {
    setUser(value);
  };

  const setRecommended = (value) => {
    setRecCourses(value);
  };

  const setCareerRecommended = (value) => {
    setCareerRecCourses(value);
  };

  const setDisplay = (value) => {
    setShow(value);
  };

  const setProg = (value) => {
    setProgress(value);
  };

  const setDegProg = (value) => {
    setDegProgress(value);
  };

  const setNewDegProg = (value) => {
    setNewDeg(value);
  };

  const setCreds = (value) => {
    setCredits(value);
  };

  const setHidden = (value) => {
    setHide(value);
  };

  const setShowBack = (value) => {
    setShowBackBtn(value);
  };

  const setLoad = (value) => {
    setLoading(value);
  };

  const setLevel = (value) => {
    setYear(value);
  };

  const setAcWarning = (value) => {
    setWarning(value);
  };

  const setChosen = (value) => {
    setChosenCourses(value);
  };

  const setShowBotButtons = (value) => {
    setBotButtons(value);
  };

  const setStudentProgramme = (value) => {
    setProgramme(value);
  };

  return (
    <div className="main-panel">
      {user ? <TopBar hide={hide}></TopBar> : null}
      {user == "student" ? <PermanentDrawerRight hide={hide} recCourses={recCourses} progress={progress} degProgress={degProgress} credits={credits} show={show} setDisplay={setDisplay} setShowBotButtons={setShowBotButtons} loading={loading} warning={warning} newDeg={newDeg} botButtons={botButtons}/> : null}
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
                return <StudentProfile {...props} setRecommended={setRecommended} setDisplay={setDisplay} setProg={setProg} setDegProg={setDegProg} setCreds={setCreds} setHidden={setHidden} setLoad={setLoad} setLevel={setLevel} setAcWarning={setAcWarning} setShowBotButtons={setShowBotButtons} recCourses={recCourses} programme={programme}/>
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
                return <CourseList {...props} setProg={setProg} setHidden={setHidden} setDisplay={setDisplay} setChosen={setChosen} setNewDegProg={setNewDegProg} showBackBtn={showBackBtn} setShowBotButtons={setShowBotButtons} recCourses={recCourses} careerRecCourses={careerRecCourses} chosenCourses={chosenCourses} newDeg={newDeg}/>
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
                return <Career {...props} setDisplay={setDisplay} setProg={setProg} setCareerRecommended={setCareerRecommended} year={year} recCourses={recCourses}/>
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
                return <Start {...props} setHidden={setHidden} setDegProg={setDegProg} setCreds={setCreds} setShowBack={setShowBack} setRecommended={setRecommended} setShowBotButtons={setShowBotButtons} setStudentProgramme={setStudentProgramme} recCourses={recCourses}/>
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/almostdone"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <BeforeBot setShowBotButtons={setShowBotButtons}/>
              } else {
                return(<Redirect to="/" />)
              }
            }
          }
        />

        <Route
          exact
          path="/finish"
          render={(props) =>
            {
              if(isAuthenticated && user=="student"){
                return <Finish chosenCourses={chosenCourses} setProg={setProg} setShowBotButtons={setShowBotButtons}/>
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
                return (
                <div className="row">
                  <div className="col-sm-10">
                    <ReactWebChat {...props} />
                  </div>
                </div>
               )
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
