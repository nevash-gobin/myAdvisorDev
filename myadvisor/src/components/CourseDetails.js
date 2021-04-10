import React, { Component } from "react";
import { Link } from 'react-router-dom'

class CourseDetails extends Component {

    render() {

    const desc = "This course provides an introduction to artificial intelligence and its applications. The course concentrates on solving problems associated with artificial intelligence using data mining and knowledge representation tools. Topics covered in the course include characteristics of intelligent systems, rule-based Expert Systems, production rules, reasoning with uncertainty, search strategies, artificial neural networks, genetic algorithms, knowledge engineering and data mining."
      
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    const prereqs = () => {
        var prereq = this.props.location.state.course.prerequisites;
        if (prereq.length > 8) {
            if (prereq.charAt(9) == "|") {
                prereq = prereq.slice(0, 8) + " OR " + prereq.slice(-8);
            }
            if (prereq.charAt(9) == "&") {
                prereq = prereq.slice(0, 8) + " AND " + prereq.slice(-8);
            }
        }
        return prereq;
    }

    return (
      <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10">
                        <p className="header blue-txt">Select Courses</p>
                        <div className="card details-card">
                            <div className="card-body">
                                <p className="course-code blue-txt">{this.props.location.state.course.courseCode}</p>
                                <p className="course-title">{this.props.location.state.course.courseTitle}</p>
                                <div className="prereqs">
                                    <span className="prereq-header blue-txt">Pre-requisites: </span>
                                    <span className="prereq-courses">{prereqs()}</span>
                                </div>
                                <div className="career">
                                    <span className="career-header blue-txt">Career Tags: </span>
                                    <span className="career-tags">Artificial Intelligence, Machine Learning, Data Science</span>
                                </div>
                                <p className="course-desc">{this.props.location.state.course.description}</p>
                                <p className="assessment-header blue-txt">Assessment</p>
                                {this.props.location.state.course.coursework != null ? (
                                    <div className="row assessment">
                                        <div className="col-sm-2">
                                            <p className="assessment-type">Coursework:</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="assessment-weight">{this.props.location.state.course.coursework}</p>
                                        </div>
                                    </div> ) : null
                                }
                                {this.props.location.state.course.finalExam != null ? (
                                    <div className="row assessment">
                                        <div className="col-sm-2">
                                            <p className="assessment-type">Final Exam:</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="assessment-weight">{this.props.location.state.course.finalExam}</p>
                                        </div>
                                    </div> ) : null
                                }
                                {this.props.location.state.course.individualProjectPres != null ? (
                                    <div className="row assessment">
                                        <div className="col-sm-2">
                                            <p className="assessment-type">Individual Project Presentation:</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="assessment-weight">{this.props.location.state.course.individualProjectPres}</p>
                                        </div>
                                    </div> ) : null
                                }
                                {this.props.location.state.course.groupProjectPres != null ? (
                                    <div className="row assessment">
                                        <div className="col-sm-2">
                                            <p className="assessment-type">Group Project Presentation:</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="assessment-weight">{this.props.location.state.course.groupProjectPres}</p>
                                        </div>
                                    </div> ) : null
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <Link to="/courses">
                                    <button type="button" class="btn btn-custom back-button blue-button">Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default CourseDetails;
