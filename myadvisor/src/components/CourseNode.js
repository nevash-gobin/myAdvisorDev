import React, { Component } from "react";
import { Link } from 'react-router-dom'

class CourseNode extends Component {
  render() {
    return (
        <Link to="/CourseDetails">
            <div className="course-node">
                <div className="row">
                    <div className="col-lg-10 col-sm-9">
                        <p className="course-code blue-txt">{this.props.code}</p>
                    </div>
                    <div className="col-lg-2 col-sm-3">
                        <p className="credit-header blue-txt">Credits</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 col-sm-9">
                        <p className="course-title">{this.props.title}</p>
                    </div>
                    <div className="col-lg-2 col-sm-3">
                        <p className="credits">{this.props.credits}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
  }
}

export default CourseNode;
