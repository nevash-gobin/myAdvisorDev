import React, { Component } from "react";
import { useEffect, useState } from "react";
import "../assets/css/StudentProfile.css"
import DetailsCard from "./DetailsCard";
import NoTranscript from "./NoTranscript";
import PullDetails from "./PullDetails";
import PullStudentCourses from "./PullStudentCourses";
import PullProgrammes from "./PullProgrammes";
import PullProgrammeCourses from "./PullProgrammeCourses";
import StudentCoursesCard from "./StudentCoursesCard";
import axios from "axios"

const StudentProfile = () => {

    const [uploaded, setUploaded] = useState(true);
   


    function uploadedHandler() {
        window.location.reload();
    }

    var details = PullDetails(localStorage.getItem("username"));
    var studentCourses = PullStudentCourses(localStorage.getItem("username"));
    var programmes = PullProgrammes();
 
    useEffect(() => {
        if (details.length === 0) {
            setUploaded(false);
        }
        else {
            setUploaded(true);
        }
        if (details.degree === "Comp Science (Special) BSC S") {
            var studentProgramme = "Computer Science (Special)"
            for (var i=0; i<programmes.length; i++) {
                if (programmes[i].name == studentProgramme) {
                    var programmeId = programmes[i].id;
                }
            }
            if (programmeId) {
                determineCourses(programmeId)
            }
        }
    })

    async function getCourses() {
        try {
          const {data:response} = await axios.get('http://localhost:5000/courses/all') //use data destructuring to get data from the promise object
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

    async function getProgrammeCourses(id) {
        try {
          const {data:response} = await axios.get(`http://localhost:5000/programmes/offered-courses/${id}`) //use data destructuring to get data from the promise object
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

    let noCreditGrade = ["F1", "F2", "F3", "DIS", "EI", "FA", "FAS", "FC", "FE", "FO", "FP", "FT", "FWS", "FTS", "AB", "AM", "AMS", "DB", "DEF", "EQ", "FM", "FMS", "FWR", "I", "LW", "NCR", "NFC", "NP", "NR", "NV", "W"]

    function getSemCourses(coreRes) {
        var sem = {};
        for (var i in sem) {
            for (var key in coreRes) {
                if(i === key) {   
                    sem[i] = coreRes[key]
                }
            }
        }
        return sem;
    }
    
    function splitBySem(coreRes, courses) {
        var semesterArr = [[]];
        for (var key in coreRes) {
            for (var i=0; i<courses.length; i++) {
                if (key === courses[i].courseCode) {
                    if ((courses[i].semester === "1" && courses[i].level === "I")) {
                        if (!semesterArr[0]) {
                            semesterArr[0] = [];
                        }
                        semesterArr[0].push({
                            courseCode: key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                    if ((courses[i].semester === "2" && courses[i].level === "I")) {
                        if (!semesterArr[1]) {
                            semesterArr[1] = [];
                        }
                        semesterArr[1].push({
                            courseCode:   key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                    if ((courses[i].semester === "1" && courses[i].level === "II")) {
                        if (!semesterArr[2]) {
                            semesterArr[2] = [];
                        }
                        semesterArr[2].push({
                            courseCode:   key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                    if ((courses[i].semester === "2" && courses[i].level === "II")) {
                        if (!semesterArr[3]) {
                            semesterArr[3] = [];
                        }
                        semesterArr[3].push({
                            courseCode:   key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                    if ((courses[i].semester === "1" && courses[i].level === "III")) {
                        if (!semesterArr[4]) {
                            semesterArr[4] = [];
                        }
                        semesterArr[4].push({
                            courseCode:   key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                    if ((courses[i].semester === "2" && courses[i].level === "III")) {
                        if (!semesterArr[5]) {
                            semesterArr[5] = [];
                        }
                        semesterArr[5].push({
                            courseCode:   key,
                            grade: coreRes[key]
                        });
                        break;
                    }
                }
            }
        }
        return semesterArr;
    }

    function determineStudentCourses(core) {
        var coreRes = {};
        for (var i=0; i<core.length; i++){
            for (var j=0; j<studentCourses.length; j++) {
                if ((studentCourses[j].courseCode === core[i].courseCode) && (studentCourses[j].grade === "IP")){
                    coreRes[`${core[i].courseCode}`] = "IP";
                }
                else if ((studentCourses[j].courseCode === core[i].courseCode) && !(noCreditGrade.includes(studentCourses[j].grade))){
                    coreRes[`${core[i].courseCode}`] = "P";
                }
                else if ((studentCourses[j].courseCode === core[i].courseCode) && (noCreditGrade.includes(studentCourses[j].grade))){
                    coreRes[`${core[i].courseCode}`] = "F";
                }
            }
        }
        return coreRes;
    }

    async function determineCourses(programmeId){
        
        let Y1S1 = {}; // List of all courses for Year 1 Semester 1
        let Y1S2 = {}; // List of all courses for Year 1 Semester 2
        let Y2S1 = {}; // List of all courses for Year 2 Semester 1
        let Y2S2 = {}; // List of all courses for Year 2 Semester 2
        let Y3S1 = {}; // List of all courses for Year 3 Semester 1
        let Y3S2 = {}; // List of all courses for Year 3 Semester 2
        var coreCourses = {};
        var semesterArr = [];

        //var courses = await getCourses();
        var courses = await getProgrammeCourses(programmeId);

        
        for (var i=0; i<courses.length; i++) { // Initialise Courses for Degree using thier Level and Semester
            if (courses[i].level === "I") {
                if (courses[i].semester === "1") {
                    Y1S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === "2") {
                    Y1S2[courses[i].courseCode] = "N";
                }
            }
            if (courses[i].level === "II") {
                if (courses[i].semester === "1") {
                    Y2S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === "2") {
                    Y2S2[courses[i].courseCode] = "N";
                }
            }
            if (courses[i].level === "III") {
                if (courses[i].semester === "1") {
                    Y3S1[courses[i].courseCode] = "N";
                }
                if (courses[i].semester === "2") {
                    Y3S2[courses[i].courseCode] = "N";
                }
            }
        }

        coreCourses = determineStudentCourses(courses);
        semesterArr = splitBySem(coreCourses, courses);


        var recCourses = [];
        var counter = 0;
        //var Y1S1 = ["COMP1600", "COMP1601", "INFO1600", "MATH1115"];
        var year = 1;
        var sem = 1;
        var key;

        
        Y1S1 = semesterArr[0];
        Y1S2 = semesterArr[1];
        Y2S1 = semesterArr[2];
        Y2S2 = semesterArr[3];
        Y3S1 = semesterArr[4];
        Y3S2 = semesterArr[5];

       
        counter = 0;
        for (key in Y1S1) {
            if (Y1S1[key].grade === "P" || Y1S1[key].grade === "F") {
                counter+=1;
            }
        }
        if (counter > 1) {
            sem = 2;
        }
        counter = 0;
        if (year === 1 && sem === 2) {
            for (key in Y1S2) {
                if (Y1S2[key].grade === "P" || Y1S2[key].grade === "F") {
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
                if (Y2S1[key].grade === "P" || Y2S1[key].grade === "F") {
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
                if (Y2S2[key].grade === "P" || Y2S2[key].grade === "F") {
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
                if (Y3S1[key].grade === "P" || Y3S1[key].grade === "F") {
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

        console.log("Year ", year, ", Sem ", sem);
      
        //console.log("Rec Courses:", recCourses)
    
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
