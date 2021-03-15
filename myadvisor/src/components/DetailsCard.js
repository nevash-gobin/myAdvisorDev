import React, { Component } from "react";

class DetailsCard extends Component {
  render() {
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Student Name:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Student ID:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.studentId}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Degree:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.degree}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Major:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.major}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Degree GPA:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.gpa}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Admit Term:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">{this.props.details.admitTerm}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default DetailsCard;
