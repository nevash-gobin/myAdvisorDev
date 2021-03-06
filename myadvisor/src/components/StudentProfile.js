import React, { Component } from "react";
import "../assets/css/StudentProfile.css"
import DetailsCard from "./DetailsCard";
import NoTranscript from "./NoTranscript";

class StudentProfile extends Component {
  render() {
    return (
      <div className="content">
            <div className="container-fluid">
                <p className="header blue-txt">Student Details</p>
                <div className="row">
                    <div className="col-sm-12">
                        <NoTranscript></NoTranscript>
                    </div>
                </div>
                <p className="header blue-txt">Courses Completed</p>
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
