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
    var studentCourses = PullStudentCourses(localStorage.getItem("username"));

    async function getCourses() {
        try {
          const {data:response} = await axios.get('http://localhost:5000/courses/all') //use data destructuring to get data from the promise object
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

    let noCreditGrade = ["F1", "F2", "F3", "DIS", "EI", "FA", "FAS", "FC", "FE", "FO", "FP", "FT", "FWS", "FTS", "AB", "AM", "AMS", "DB", "DEF", "EQ", "FM", "FMS", "FWR", "I", "IP", "LW", "NCR", "NFC", "NP", "NR", "NV", "W"]

    if (details.degree === "Comp Science (Special) BSC S") {
        console.log("bool")
        var core = ["COMP1600", "COMP1601", "INFO1600", "MATH1115", "COMP1602", "COMP1603", "COMP1604", "INFO1601", "COMP2601", "COMP2602", "COMP2605", "COMP2611", "MATH2250", "COMP2603", "COMP2604","COMP2606", "INFO2602", "INFO2604", "COMP3602", "COMP3603", "COMP3613", "COMP3601", "INFO3604"];
        var coreRes = {}
        var recCourses = []
        var year;
        for (var i=0; i<core.length; i++){
            for (var j=0; j<studentCourses.length; j++) {
                if ((studentCourses[j].courseCode == core[i]) && !(noCreditGrade.includes(studentCourses[j].grade))){
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
                if ((studentCourses[j].courseCode == core[i]) && (noCreditGrade.includes(studentCourses[j].grade))){
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

    function getSemCourses(sem) {
        for (i in sem) {
            for (var key in coreRes) {
                if(i === key) {   
                    if(coreRes[key] === "P") {
                        sem[i] = "P"
                    }
                    if(coreRes[key] === "F") {
                        sem[i] = "F"
                    }
                }
            }
        }
        return sem;
    }

    async function determineCourses(coreRes){
        
        let Y1S1 = {}; // List of all courses for Year 1 Semester 1
        let Y1S2 = {}; // List of all courses for Year 1 Semester 2
        let Y2S1 = {}; // List of all courses for Year 2 Semester 1
        let Y2S2 = {}; // List of all courses for Year 2 Semester 2
        let Y3S1 = {}; // List of all courses for Year 3 Semester 1
        let Y3S2 = {}; // List of all courses for Year 3 Semester 2

        var courses = await getCourses();

        
        for (var i=0; i<courses.length; i++) { // Initialise Courses for Degree using thier Level and Semester
           
            if (courses[i].level === "I") {
                if (courses[i].semester === 1) {
                    Y1S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === 2) {
                    Y1S2[courses[i].courseCode] = "N";
                }
            }
            if (courses[i].level === "II") {
                if (courses[i].semester === 1) {
                    Y2S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === 2) {
                    Y2S2[courses[i].courseCode] = "N";
                }
            }
            if (courses[i].level === "III") {
                if (courses[i].semester === 1) {
                    Y3S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === 2) {
                    Y3S2[courses[i].courseCode] = "N";
                }
            }
        }

        var recCourses = [];
        var counter = 0;
        //var Y1S1 = ["COMP1600", "COMP1601", "INFO1600", "MATH1115"];
        var year = 1;
        var sem = 1;

        Y1S1 = getSemCourses(Y1S1);
        Y1S2 = getSemCourses(Y1S2);
        Y2S1 = getSemCourses(Y2S1);
        Y2S2 = getSemCourses(Y2S2);
        Y3S1 = getSemCourses(Y3S1);
        Y3S2 = getSemCourses(Y3S2);

        counter = 0;
        for (key in Y1S1) {
            if (Y1S1[key] === "P" || Y1S1[key] === "F") {
                counter+=1;
            }
        }
        if (counter > 1) {
            sem = 2;
        }
        counter = 0;
        if (year === 1 && sem === 2) {
            for (key in Y1S2) {
                if (Y1S2[key] === "P" || Y1S2[key] === "F") {
                    counter+=1;
                }
            }
            if (counter > 1) {
                sem = 1;
                year = 2;
            }
        }
        counter = 0;
        if (year === 2 && sem === 1) {
            for (key in Y2S1) {
                if (Y2S1[key] === "P" || Y2S1[key] === "F") {
                    counter+=1;
                }
            }
            if (counter > 1) {
                sem = 2;
            }
        }
        counter = 0;
        if (year === 2 && sem === 2) {
            for (key in Y2S2) {
                if (Y2S2[key] === "P" || Y2S2[key] === "F") {
                    counter+=1;
                }
            }
            if (counter > 1) {
                sem = 1;
                year = 3;
            }
        }
        counter = 0;
        if (year === 3 && sem === 1) {
            for (key in Y3S1) {
                if (Y3S1[key] === "P" || Y3S1[key] === "F") {
                    counter+=1;
                }
            }
            if (counter > 1) {
                sem = 2;
            }
        }
       
        /*if (year === 1 && sem === 2) {
            for (key in Y1S2) {
                recCourses.push(key);
            }
        } */
        console.log("year", year);
        console.log("sem", sem);
        //console.log("Rec Courses:", recCourses)
    
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
                        <StudentCoursesCard courses={studentCourses}></StudentCoursesCard> ) : (
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
