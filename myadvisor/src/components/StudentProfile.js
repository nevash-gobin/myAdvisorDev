import React, { Component } from "react";
import "../assets/css/StudentProfile.css"

class StudentProfile extends Component {
  render() {
    return (
      <div className="content">
            <div className="container-fluid">
                <p className="details-header blue-txt">Student Details</p>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card details-card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Student Name:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">Matthew Christian</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Student ID:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">816015078</p>
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
                </div>
                <p className="details-header blue-txt">Courses Completed</p>
                <div className="card details-card">
                    <div className="card-body">
                <table class="table table-borderless table-striped">
                    <thead>
                        <tr class="d-flex blue-txt">
                            <th class="col-1 level-cell">Level</th>
                            <th class="col-2 code-cell">Course Code</th>
                            <th class="col-8 title-cell">Course Title</th>
                            <th class="col-1 credit-cell">Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="d-flex">
                            <td class="col-1 level-cell">1</td>
                            <td class="col-2 code-cell">COMP 1600</td>
                            <td class="col-8 title-cell">Introduction to Computer Concepts</td>
                            <td class="col-1 credit-cell">3</td>
                        </tr>
                        <tr class="d-flex">
                            <td class="col-1 level-cell">1</td>
                            <td class="col-2 code-cell">COMP 1601</td>
                            <td class="col-8 title-cell">Computer Programming I</td>
                            <td class="col-1 credit-cell">3</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                </div>
            </div>
      </div>
    );
  }
}

export default StudentProfile;
