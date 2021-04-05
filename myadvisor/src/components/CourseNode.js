import React, { Component } from "react";
import { useHistory } from 'react-router-dom'

function CourseNode(props) {
    const history = useHistory();

    const onClickFunction = () => {
        history.push({
            pathname: `/coursedetails`,
            state: { course: props.course }
          })
    }

    return (
        <div className="course-node" onClick={() => onClickFunction()}>
            <div className="row">
                <div className="col-lg-10 col-sm-9">
                    <p className="course-code blue-txt">{props.course.courseCode}</p>
                </div>
                <div className="col-lg-2 col-sm-3">
                    <p className="credit-header blue-txt">Credits</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 col-sm-9">
                    <p className="course-title">{props.course.courseTitle}</p>
                </div>
                <div className="col-lg-2 col-sm-3">
                    <p className="credits">{props.course.credits}</p>
                </div>
            </div>
        </div>
    );
}

export default CourseNode;
