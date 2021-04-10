import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

class CourseDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courseCareers: []
        }
        this.getCourseCareers = this.getCourseCareers.bind(this);
        this.determineCourseCareers = this.determineCourseCareers.bind(this);
    }

    componentDidMount() {
        this.determineCourseCareers();
    }

    async getCourseCareers(id) {
        try {
            const {data:response} = await axios.get(`http://localhost:5000/courses/careers/${id}`) //use data destructuring to get data from the promise object
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async determineCourseCareers() {
        var courseCareers = [];
        courseCareers = await this.getCourseCareers(this.props.location.state.course.id);
        this.setState({
            courseCareers: courseCareers
        });
    }

    render() {

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
                                    {
                                        Array.from({ length: this.state.courseCareers.length }, (_, k) => {
                                            if (k !== this.state.courseCareers.length-1 )
                                                return <span className="career-tags">{this.state.courseCareers[k]}, </span>
                                            else 
                                                return <span className="career-tags">{this.state.courseCareers[k]}</span>
                                        }) 
                                    }
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
