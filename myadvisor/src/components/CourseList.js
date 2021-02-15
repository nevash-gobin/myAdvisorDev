import React, { Component } from "react";
import CourseNode from './CourseNode'
import "../assets/css/Courses.css";

class CourseList extends Component {
  render() {
    return (
      <div className="content">
            <div className="container-fluid">
                <p className="header blue-txt">Select Courses</p>
                <div className="card details-card outer-card">
                    <div className="card-body">
                        <p className="courselist-card-text">Click on a course to see more details</p>
                        <div className="card courselist-card">
                            <div className="card-body">
                                <CourseNode code="COMP 3608" title="Intelligent Systems" credits={3}></CourseNode>
                                <CourseNode code="COMP 3609" title="Game Programming" credits={3}></CourseNode>
                                <CourseNode code="COMP 3610" title="Big Data Analytics" credits={3}></CourseNode>
                                <CourseNode code="COMP 3611" title="Modelling and Simulation" credits={3}></CourseNode>
                                <CourseNode code="INFO 3606" title="Cloud Computing" credits={3}></CourseNode>
                                <CourseNode code="INFO 3609" title="Project" credits={3}></CourseNode>
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
      </div>
    );
  }
}

export default CourseList;
