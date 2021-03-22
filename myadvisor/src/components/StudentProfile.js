import React, { Component } from "react";
import { useEffect, useState } from "react";
import "../assets/css/StudentProfile.css"
import DetailsCard from "./DetailsCard";
import NoTranscript from "./NoTranscript";
import PullDetails from "./PullDetails";
import PullStudentCourses from "./PullStudentCourses";
import StudentCoursesCard from "./StudentCoursesCard";

const StudentProfile = () => {

    const [uploaded, setUploaded] = useState(false);


    function uploadedHandler() {
        setUploaded(true)
    }

    var details = PullDetails(localStorage.getItem("username"));
    var courses = PullStudentCourses(localStorage.getItem("username"));


        /*for(var i=0; i<courses.length; i++) {
            if(courses[i].courseCode === "COMP1600") {
                console.log(courses[i])
            }
        }
        
        console.log(courses) */

    let noCreditGrade = ["F1", "F2", "F3", "DIS", "EI", "FA", "FAS", "FC", "FE", "FO", "FP", "FT", "FWS", "FTS", "AB", "AM", "AMS", "DB", "DEF", "EQ", "FM", "FMS", "FWR", "I", "IP", "LW", "NCR", "NFC", "NP", "NR", "NV", "W"]

    if (details.degree === "Comp Science (Special) BSC S") {
        console.log("bool")
        var core = ["COMP1600", "COMP1601", "INFO1600", "MATH1115", "COMP1602", "COMP1603", "COMP1604", "INFO1601", "COMP2601", "COMP2602", "COMP2605", "COMP2611", "MATH2250", "COMP2603", "COMP2604","COMP2606", "INFO2602", "INFO2604", "COMP3602", "COMP3603", "COMP3613", "COMP3601", "INFO3604"];
        var coreRes = {
            COMP1600: "F",
            COMP1601: "F",
            INFO1600: "F",
            MATH1115: "F"
        }
        var recCourses = []
        var year;
        for (var i=0; i<core.length; i++){
            for (var j=0; j<courses.length; j++) {
                if ((courses[j].courseCode == core[i]) && !(noCreditGrade.includes(courses[j].grade))){
                    coreRes[`${core[i]}`] = "P";
                    if (core[i].charAt(4) == "1") {
                        year = 1;
                    }
                    if (core[i].charAt(4) == "2") {
                        year = 2;
                    }
                    if (core[i].charAt(4) == "3") {
                        year = 3;
                    }
                }
                if ((courses[j].courseCode == core[i]) && (noCreditGrade.includes(courses[j].grade))){
                    coreRes[`${core[i]}`] = "F";
                }
            }
        }
        for (var key in coreRes) {   
            if(coreRes[key].includes("F")) {
                recCourses.push(key)
            }
        }
        console.log(recCourses)
        console.log("Year", year)
    }

    

    return (
        <div className="content">
                <div className="container-fluid">
                    <p className="header blue-txt">Student Details</p>
                    <div className="row">
                        <div className="col-sm-12">
                            { uploaded ? (
                                <DetailsCard details={details}></DetailsCard> ) : (
                                <NoTranscript uploadedHandler={uploadedHandler}></NoTranscript>
                            ) }
                        </div>
                    </div>
                    <p className="header blue-txt">Courses Completed</p>
                     { uploaded ? (
                        <StudentCoursesCard courses={courses}></StudentCoursesCard> ) : (
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        )
                     }                  
                </div>
        </div>
    );

}

export default StudentProfile;
