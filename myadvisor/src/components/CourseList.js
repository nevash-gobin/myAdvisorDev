import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import CourseNode from './CourseNode'
import PullCourses from "./PullCourses";
import "../assets/css/Courses.css";
import CourseDetails from "./CourseDetails";

const CourseList = () => { 
    const [clicked, setClicked] = useState(false);
    const [course, setCourse] = useState(null);
    const history = useHistory();

    const nodeClickHandler = (course) => {
      setClicked(true)
      setCourse(course)
    }

    var courses = PullCourses();

    return (
      <div className="content">
            <div className="container-fluid">
                <p className="header blue-txt">Select Courses</p>
                <div className="card details-card outer-card">
                    <div className="card-body">
                        <p className="courselist-card-text">Click on a course to see more details</p>
                        <div className="card courselist-card custom-scroll">
                            <div className="card-body">{
                              Array.from({ length: courses.length }, (_, k) => (
                                <CourseNode course={courses[k]} code={courses[k].courseCode} title={courses[k].courseTitle} credits={courses[k].credits} clickHandler={nodeClickHandler}></CourseNode>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                      <button type="button" class="btn btn-custom course-next-button blue-button">Next</button>
                    </div>
                </div>
            </div>
            ) 
      </div>
    );
  
}

export default CourseList;
