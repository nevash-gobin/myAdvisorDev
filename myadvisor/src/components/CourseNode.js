import React, { Component } from "react";
import { Link } from 'react-router-dom'

class CourseNode extends Component {
  render() {
    return (
        <div className="course-node" onClick={() => this.props.clickHandler(this.props.course)}>
            <div className="row">
                <div className="col-lg-10 col-sm-9">
                    <p className="course-code blue-txt">{this.props.course.courseCode}</p>
                </div>
                <div className="col-lg-2 col-sm-3">
                    <p className="credit-header blue-txt">Credits</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 col-sm-9">
                    <p className="course-title">{this.props.course.courseTitle}</p>
                </div>
                <div className="col-lg-2 col-sm-3">
                    <p className="credits">{this.props.course.credits}</p>
                </div>
            </div>
        </div>
    );
  }
}

export default CourseNode;
