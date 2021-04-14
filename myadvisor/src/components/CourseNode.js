import React, { Component } from "react";
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";

function CourseNode(props) {
    const history = useHistory(); // Used to redirect to a new path without losing state values
    const [selected, setSelected] = useState(false); // State used to rerender the view

    // Function that runs when the user clicks on a course
    const onClickFunction = () => {
        // Reroute user to course details page
        history.push({
            pathname: `/coursedetails`,
            state: { course: props.course }
          })
    }
    
    // Function that runs when the user checks or unchecks the checkbox
    const onChange = (event) => {
        setSelected(!selected);
        props.onChange(event, props.course.credits); // Run the onChange function from CourseList
    }
    

    return (
        <div className="course-node">
            <div className="row">
                <div className="col-lg-9 col-sm-7" onClick={() => onClickFunction()}>
                    <p className="course-code blue-txt">{props.course.courseCode}</p>
                </div>
                <div className="col-lg-2 col-sm-3" onClick={() => onClickFunction()}>
                    <p className="credit-header blue-txt">Credits</p>
                </div>
                <div className="col-lg-1 col-sm-2">
                    <p className="add-header blue-txt">Add</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-9 col-sm-7" onClick={() => onClickFunction()}>
                    <p className="course-title">{props.course.courseTitle}</p>
                </div>
                <div className="col-lg-2 col-sm-3" onClick={() => onClickFunction()}>
                    <p className="credits">{props.course.credits}</p>
                </div>
                <div className="col-lg-1 col-sm-2 check-div">
                    { props.chosen.includes(props.course.courseCode) ? (
                        <input type="checkbox" class="form-check-input course-check" id={props.course.courseCode} value={props.course.courseCode} onChange={onChange} checked></input>         
                    ) : (
                        <input type="checkbox" class="form-check-input course-check" id={props.course.courseCode} value={props.course.courseCode} onChange={onChange}></input>        
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseNode;
