import React, { Component } from "react";
import { useEffect, useState } from "react";
import "../assets/css/StudentProfile.css"
import DetailsCard from "./DetailsCard";
import NoTranscript from "./NoTranscript";
import PullDetails from "./PullDetails";
import PullStudentCourses from "./PullStudentCourses";
import StudentCoursesCard from "./StudentCoursesCard";
import axios from "axios"

const StudentProfile = () => {

    const [uploaded, setUploaded] = useState(false);


    function uploadedHandler() {
        setUploaded(true)
    }

    var details = PullDetails(localStorage.getItem("username"));
    var courses = PullStudentCourses(localStorage.getItem("username"));

    async function getCourses() {
        try {
          const {data:response} = await axios.get('http://localhost:5000/courses/all') //use data destructuring to get data from the promise object
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

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
        var coreRes = {}
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
        determineCourses(coreRes);
    }


    async function determineCourses(coreRes){
        var courseList = await getCourses();
        var Y1S1 = {
            COMP1600: "NA",
            COMP1601: "NA",
            INFO1600: "NA",
            MATH1115: "NA",
        }
        var Y1S2 = {
            COMP1602: "NA",
            COMP1603: "NA",
            COMP1604: "NA",
            INFO1601: "NA",
        }
        var recCourses = [];
        var counter = 0;
        //var Y1S1 = ["COMP1600", "COMP1601", "INFO1600", "MATH1115"];
        var year = 1;
        var sem = 1;
        for (i in Y1S1) {
            for (var key in coreRes) {
                if(i === key) {   
                    if(coreRes[key] === "P") {
                        Y1S1[i] = "P"
                    }
                    if(coreRes[key] === "F") {
                        Y1S1[i] = "F"
                    }
                }
            }
        }
        counter = 0;
        for (key in Y1S1) {
            if (Y1S1[key] === "P" || Y1S1[key] === "F") {
                counter+=1;
            }
        }
        if (counter === Object.keys(Y1S1).length) {
            sem = 2;
        }
        if (year === 1 && sem === 2) {
            for (key in Y1S2) {
                recCourses.push(key);
            }
        }
        console.log("Rec Courses:", recCourses)
    
    }

    

    return (
        <div className="content">
                <div className="container-fluid">
                    <p className="header blue-txt">Student Details</p>
                    <div className="row">
                        <div className="col-sm-12">
                            { !uploaded ? (
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
