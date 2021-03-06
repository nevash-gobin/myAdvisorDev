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
                            <p className="row-info">John Doe</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Student ID:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">816000000</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Degree:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">Computer Science (Special)</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Major:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">Computer Science (Special)</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Degree GPA:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">3.75</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p className="row-title blue-txt">Admit Term:</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="row-info">2018/2019 Semester I</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default DetailsCard;
