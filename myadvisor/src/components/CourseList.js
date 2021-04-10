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
    const history = useHistory();

    const nodeClickHandler = (course) => {
      setClicked(true)
      setCourse(course)
    }
 
    var courses = PullCourses();

    let recCourses = undefined;
    
    if (props.recCourses) {
      recCourses = props.recCourses;
    }

    useEffect(() => {
      console.log(props.recCourses); 
      props.setProg(60);
      props.setHidden(false);
      props.setDisplay(false);
    })

    function allClick() {
      if (core || career) {
        setAll(true);
        setCore(false);
        setCareer(false);
      }
    }

    function coreClick() {
      if (all || career) {
        setAll(false);
        setCore(true);
        setCareer(false);
      }
    }

    function careerClick() {
      if (core || all) {
        setAll(false);
        setCore(false);
        setCareer(true);
      }
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
                        <div className="row tab-group">
                          { all ? (

                            <div className="col-sm-4">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={allClick}>All Courses</button>
                            </div> ) : (

                            <div className="col-sm-4">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={allClick}>All Courses</button>
                            </div>

                          ) }
                          { core ? (

                            <div className="col-sm-4">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={coreClick}>Core Courses</button>
                            </div> ) : ( 
                            
                            <div className="col-sm-4">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={coreClick}>Core Courses</button>
                            </div>

                          ) }
                          { career ? (

                            <div className="col-sm-4">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={careerClick}>Career Specific Courses</button>
                            </div> ) : (

                            <div className="col-sm-4">
                             <button type="button" class="btn btn-custom tab-button fade-button" onClick={careerClick}>Career Specific Courses</button>
                            </div>
                          ) }
                        </div>
                        <div className="card courselist-card custom-scroll">
                            <div className="card-body">{
                              Array.from({ length: courses.length }, (_, k) => {
                                if (recCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} code={courses[k].courseCode} title={courses[k].courseTitle} credits={courses[k].credits} clickHandler={nodeClickHandler}></CourseNode>    
                                }
                              })}
                            </div>
                        </div>
                    </div>
                </div>
                { props.showBackBtn ? (
                  <div className="row button-row">
                      <div className="col-sm-2">
                        <Link to="/career">
                          <button type="submit" class="btn btn-custom career-next-button blue-button">Back</button>
                        </Link>
                      </div>          
                      <div className="col-sm-2 offset-sm-8">
                      <Link to="/bot">
                        <button type="submit" class="btn btn-custom career-next-button blue-button">Next</button>
                        </Link>
                      </div>
                  </div>
                ) : (
                  <div className="row button-row">        
                      <div className="col-sm-2">
                        <Link to="/bot">
                          <button type="submit" class="btn btn-custom career-next-button blue-button">Next</button>
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
