import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import CourseNode from './CourseNode'
import PullCourses from "./PullCourses";
import "../assets/css/Courses.css";
import CourseDetails from "./CourseDetails";
import { Link } from 'react-router-dom'

const CourseList = (props) => { 
    const [clicked, setClicked] = useState(false);
    const [course, setCourse] = useState(null);
    const [all, setAll] = useState(true);
    const [core, setCore] = useState(false);
    const [career, setCareer] = useState(false);
    const [chosen, setChosen] = useState(false);
    const [chosenList, setChosenList] = useState([]);

    const history = useHistory();

    const nodeClickHandler = (course) => {
      setClicked(true)
      setCourse(course)
    }
 
    var courses = PullCourses();

    let recCourses = undefined;
    let careerRecCourses = undefined;
    
    if (props.recCourses) {
      recCourses = props.recCourses;
    }
    else {
      history.push({
        pathname: '/home'
      })
    }

    if (props.careerRecCourses) {
      careerRecCourses = props.careerRecCourses;
    }
    else {
      careerRecCourses = [];
    }

    useEffect(() => {
      props.setProg(60);
      props.setHidden(false);
      props.setDisplay(false);
    })

    function allClick() {
      if (core || career || chosen) {
        setAll(true);
        setCore(false);
        setCareer(false);
        setChosen(false);
      }
    }

    function coreClick() {
      if (all || career || chosen) {
        setAll(false);
        setCore(true);
        setCareer(false);
        setChosen(false);
      }
    }

    function careerClick() {
      if (core || all || chosen) {
        setAll(false);
        setCore(false);
        setCareer(true);
        setChosen(false);
      }
    }

    function chosenClick() {
      if (core || all || career) {
        setAll(false);
        setCore(false);
        setCareer(false);
        setChosen(true);
      }
    }

    function onChange(event) { 
      var chosenArray = props.chosenCourses;
      var clear = false;
      if (event.currentTarget.checked === true) {
        chosenArray.push(event.currentTarget.value);
      }
      else {
        while (!clear) {
          var index = chosenArray.indexOf(event.currentTarget.value);
          if (index > -1) {
            chosenArray.splice(index, 1);
          }
          else {
            clear = true;
          }
        }
        clear = false;
      }
      setChosenList(chosenArray);
      props.setChosen(chosenArray);
    }

    return (
      <div className="content">
            <div className="container-fluid">
            <div className="row">
              <div className="col-sm-10">
                <p className="header blue-txt">Select Courses</p>
                <div className="card details-card outer-card">
                    <div className="card-body">
                        <p className="courselist-card-text">Click on a course to see more details</p>
                        <p className="courselist-card-text">Check the Add box if you are interested in pursuing a course</p>
                        <div className="row tab-group">
                          { all ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={allClick}>All Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={allClick}>All Courses</button>
                            </div>

                          ) }
                          { core ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={coreClick}>Core Courses</button>
                            </div> ) : ( 
                            
                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={coreClick}>Core Courses</button>
                            </div>

                          ) }
                          { career ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={careerClick}>Career Specific Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                             <button type="button" class="btn btn-custom tab-button fade-button" onClick={careerClick}>Career Specific Courses</button>
                            </div>
                          ) }
                          { chosen ? (
                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={chosenClick}>Your Chosen Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                            <button type="button" class="btn btn-custom tab-button fade-button" onClick={chosenClick}>Your Chosen Courses</button>
                            </div>
                          ) }
                        </div>
                        <div className="card courselist-card custom-scroll">
                            <div className="card-body">{
                              all ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (recCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} clickHandler={nodeClickHandler} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : core ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (recCourses.includes(courses[k].courseCode) && courses[k].type === "Core") {
                                  return <CourseNode course={courses[k]} clickHandler={nodeClickHandler} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : career ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (careerRecCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} clickHandler={nodeClickHandler} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : chosen ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (props.chosenCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} clickHandler={nodeClickHandler} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : (null)
                            }
                            </div>
                        </div>
                    </div>
                </div>
                { props.showBackBtn ? (
                  <div className="row button-row">
                      <div className="col-sm-2">
                        <Link to="/career">
                          <button type="submit" class="btn btn-custom back-button blue-button">Back</button>
                        </Link>
                      </div>          
                      <div className="col-sm-2 offset-sm-8">
                      <Link to="/bot">
                        <button type="submit" class="btn btn-customnext-button blue-button">Next</button>
                        </Link>
                      </div>
                  </div>
                ) : (
                  <div className="row button-row">        
                      <div className="col-sm-2 offset-sm-8">
                        <Link to="/bot">
                          <button type="submit" class="btn btn-custom next-button blue-button">Next</button>
                        </Link>
                      </div>
                  </div>
                ) }
            </div>
            </div>
            </div>
      </div>
    );
  
}

export default CourseList;
