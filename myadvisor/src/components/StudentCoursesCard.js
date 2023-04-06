import React, { Component } from "react";

class StudentCoursesCard extends Component {
  render() {
    return (
        <div className="card details-card">
            <div className="card-body">
                <table class="table table-borderless table-striped">
                    <thead>
                        <tr class="d-flex blue-txt">
                            <th class="col-1 level-cell">Level</th>
                            <th class="col-2 code-cell">Course Code</th>
                            <th class="col-8 title-cell">Course Title</th>
                            <th class="col-1 credit-cell">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({ length: this.props.courses.length }, (_, k) => (
                                <tr class="d-flex" key={k}>
                                    <td class="col-1 level-cell">{this.props.courses[k].courseCode.charAt(4)}</td>
                                    <td class="col-2 code-cell">{this.props.courses[k].courseCode}</td>
                                    <td class="col-8 title-cell">{this.props.courses[k].courseTitle}</td>
                                    <td class="col-1 credit-cell">{this.props.courses[k].grade}</td>
                                </tr>
                                
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}

export default StudentCoursesCard;
