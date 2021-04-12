import React, { Component } from "react";
import { useEffect, useState } from "react";
import "../assets/css/StudentProfile.css"
import DetailsCard from "./DetailsCard";
import NoTranscript from "./NoTranscript";
import PullDetails from "./PullDetails";
import PullStudentCourses from "./PullStudentCourses";
import PullProgrammes from "./PullProgrammes";
import StudentCoursesCard from "./StudentCoursesCard";
import axios from "axios"

const StudentProfile = (props) => {

    const [uploaded, setUploaded] = useState(true);
    const [processed, setProcessed] = useState(false);
   


    function uploadedHandler() {
        window.location.reload();
    }

    var details = PullDetails(localStorage.getItem("username"));
    var studentCourses = PullStudentCourses(localStorage.getItem("username"));
    var programmes = PullProgrammes();
 
    useEffect(() => {
        props.setDisplay(true);
        props.setHidden(false);
        if (!processed) {
            if (details.gpa < 2.0 && details.gpa != 0) {
                props.setAcWarning(true);
            }
            if (details.length === 0) {
                setUploaded(false);
                props.setDegProg(0);
                props.setCreds(93);
            }
            else {
                setUploaded(true);
                props.setDegProg(details.progress);
                props.setCreds(93 - details.credits);
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

    function getCoreCourses(courses) {
        var core = [];
        for (var i=0; i<courses.length; i++) {
            if (courses[i].type === "Core") {
                core.push(courses[i]);
            }
        }
        return core;
    }

    function recommendCoreCourses(coreSemesterArr, year, currentSem, courses) {
        var coreY1S1 = coreSemesterArr[0]; // Core courses offered in Year 1 Semester 1
        var coreY1S2 = coreSemesterArr[1];
        var coreY2S1 = coreSemesterArr[2];
        var coreY2S2 = coreSemesterArr[3];
        var coreY3S1 = coreSemesterArr[4];
        var coreY3S2 = coreSemesterArr[5];
        var recCourses = courses;
        var key;

        if (year === 1 && currentSem === 1) { //If student is in Year 1 Semester 1
            for (key in coreY1S1) { // Iterate core courses offered in year 1 semester 1
                if (coreY1S1[key].grade === "N" || coreY1S1[key].grade === "F") { // If course has not been done before or student failed it in the past
                    if (!courses.includes(coreY1S1[key].courseCode)) // If course wasn't already recommended
                        recCourses.push(coreY1S1[key].courseCode) // Add course to recommended course array
                }
            }
        }
        if (year === 1 && currentSem === 2) {
            for (key in coreY1S2) {
                if (coreY1S2[key].grade === "N" || coreY1S2[key].grade === "F") {
                    if (!courses.includes(coreY1S2[key].courseCode))
                        recCourses.push(coreY1S2[key].courseCode)
                }
            }
        }
        if (year === 2 && currentSem === 1) {
            for (key in coreY2S1) {
                if (coreY2S1[key].grade === "N" || coreY2S1[key].grade === "F") {
                    if (!courses.includes(coreY2S1[key].courseCode))
                        recCourses.push(coreY2S1[key].courseCode)
                }
            }
            for (key in coreY1S1) { // Look for courses being offered in Year 1 Semester 1 that student didnt do or failed
                if (coreY1S1[key].grade === "N" || coreY1S1[key].grade === "F") {
                    if (!courses.includes(coreY1S1[key].courseCode))
                        recCourses.push(coreY1S1[key].courseCode)
                }
            }
        }
        if (year === 2 && currentSem === 2) {
            for (key in coreY2S2) {
                if (coreY2S2[key].grade === "N" || coreY2S2[key].grade === "F") {
                    if (!courses.includes(coreY2S2[key].courseCode))
                        recCourses.push(coreY2S2[key].courseCode)
                }
            }
            for (key in coreY1S2) {
                if (coreY1S2[key].grade === "N" || coreY1S2[key].grade === "F") {
                    if (!courses.includes(coreY1S2[key].courseCode))
                        recCourses.push(coreY1S2[key].courseCode)
                }
            }
        }
        if (year === 3 && currentSem === 1) {
            for (key in coreY3S1) {
                if (coreY3S1[key].grade === "N" || coreY3S1[key].grade === "F") {
                    if (!courses.includes(coreY3S1[key].courseCode))
                        recCourses.push(coreY3S1[key].courseCode)
                }
            }
            for (key in coreY2S1) {
                if (coreY2S1[key].grade === "N" || coreY2S1[key].grade === "F") {
                    if (!courses.includes(coreY2S1[key].courseCode))
                        recCourses.push(coreY2S1[key].courseCode)
                }
            }
            for (key in coreY1S1) {
                if (coreY1S1[key].grade === "N" || coreY1S1[key].grade === "F") {
                    if (!courses.includes(coreY1S1[key].courseCode))
                        recCourses.push(coreY1S1[key].courseCode)
                }
            }
        }
        if (year === 3 && currentSem === 2) {
            for (key in coreY3S2) {
                if (coreY3S2[key].grade === "N" || coreY3S2[key].grade === "F") {
                    if (!courses.includes(coreY3S2[key].courseCode))
                        recCourses.push(coreY3S2[key].courseCode)
                }
            }
            for (key in coreY2S2) {
                if (coreY2S2[key].grade === "N" || coreY2S2[key].grade === "F") {
                    if (!courses.includes(coreY2S2[key].courseCode))
                        recCourses.push(coreY2S2[key].courseCode)
                }
            }
            for (key in coreY1S2) {
                if (coreY1S2[key].grade === "N" || coreY1S2[key].grade === "F") {
                    if (!courses.includes(coreY1S2[key].courseCode))
                        recCourses.push(coreY1S2[key].courseCode)
                }
            }
        }
        return recCourses;
    }

    function removeCoursesNoPrereq(recCourses, courses, studentCourses) {
        var index;
        for (var i=0; i<courses.length; i++) {
            if(recCourses.includes(courses[i].courseCode)) {
                var prereq = courses[i].prerequisites;
                if (prereq.length === 8) {
                    if (!(studentCourses[prereq] === "P")) {
                        index = recCourses.indexOf(courses[i].courseCode);
                            if (index > -1) {
                                recCourses.splice(index, 1);
                            }
                    }
                }
                if (prereq.length > 8) {
                    var prereq1 = prereq.slice(0, 8);
                    var prereq2 = prereq.slice(-8);
                    if (prereq.charAt(9) === "|") {
                        if (!((studentCourses[prereq1] === "P") || (studentCourses[prereq2] === "P"))) {
                            index = recCourses.indexOf(courses[i].courseCode);
                            if (index > -1) {
                                recCourses.splice(index, 1);
                            }
                        }
                    }
                    if (prereq.charAt(9) === "&") {
                        if (!((studentCourses[prereq1] === "P") && (studentCourses[prereq2] === "P"))) {
                            index = recCourses.indexOf(courses[i].courseCode);
                            if (index > -1) {
                                recCourses.splice(index, 1);
                            }
                        }
                    }
                }
            }
        }
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
                else {
                    if (!coreRes[`${core[i].courseCode}`]) {
                        coreRes[`${core[i].courseCode}`] = "N";
                    }
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
        var programmeCourses = {};
        var semesterArr = [];
        var coreSemesterArr = [];
        var today = new Date();
        var currentSem;

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

        programmeCourses = determineStudentCourses(courses);
        semesterArr = splitBySem(programmeCourses, courses);
        var coreCourses = getCoreCourses(courses);
        coreSemesterArr = splitBySem(programmeCourses, coreCourses);

        var recCourses = [];
        var counter = 0;
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
            if (Y1S1[key].grade === "P" || Y1S1[key].grade === "F" || Y1S1[key].grade === "IP") {
                counter+=1;
            }
        }
        if (counter > 1) {
            sem = 2;
        }
        counter = 0;
        if (year === 1 && sem === 2) {
            for (key in Y1S2) {
                if (Y1S2[key].grade === "P" || Y1S2[key].grade === "F" || Y1S2[key].grade === "IP") {
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
                if (Y2S1[key].grade === "P" || Y2S1[key].grade === "F" || Y2S1[key].grade === "IP") {
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
                if (Y2S2[key].grade === "P" || Y2S2[key].grade === "F" || Y3S1[key].grade === "IP") {
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
                if (Y3S1[key].grade === "P" || Y3S1[key].grade === "F" || Y3S2[key].grade === "IP") {
                    counter+=1;
                }
            }
            if (counter > 1) {
                sem = 2;
            }
        }

        if (today.getMonth() < 4) {
            currentSem = 2;
        }
        else if (today.getMonth() < 6) {
            currentSem = 3;
        }
        else {
            currentSem = 1;
        }

        if (year === 1 && currentSem === 1) {
            for (key in Y1S1) {
                if (Y1S1[key].grade === "N") {
                    recCourses.push(Y1S1[key].courseCode)
                }
            }
        }
        if (year === 1 && currentSem === 2) {
            for (key in Y1S2) {
                if (Y1S2[key].grade === "N") {
                    recCourses.push(Y1S2[key].courseCode)
                }
            }
        }
        if (year === 2 && currentSem === 1) {
            for (key in Y2S1) {
                if (Y2S1[key].grade === "N") {
                    recCourses.push(Y2S1[key].courseCode)
                }
            }
        }
        if (year === 2 && currentSem === 2) {
            for (key in Y2S2) {
                if (Y2S2[key].grade === "N") {
                    recCourses.push(Y2S2[key].courseCode)
                }
            }
        }
        if (year === 3 && currentSem === 1) {
            for (key in Y3S1) {
                if (Y3S1[key].grade === "N") {
                    recCourses.push(Y3S1[key].courseCode)
                }
            }
        }
        if (year === 3 && currentSem === 2) {
            for (key in Y3S2) {
                if (Y3S2[key].grade === "N") {
                    recCourses.push(Y3S2[key].courseCode)
                }
            }
        }

        recCourses = recommendCoreCourses(coreSemesterArr, year, currentSem, recCourses);
        removeCoursesNoPrereq(recCourses, courses, programmeCourses);
        props.setRecommended(recCourses);
        props.setLevel(year);
        if (props.recCourses !== null) {
            props.setLoad(false);
        }
        setProcessed(true);
    }

 

    return (
        <div className="content">
                <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-10">
                    <p className="header blue-txt">Student Details</p>
                    <div className="row">
                        <div className="col-sm-12">
                            { uploaded ? (
                                <DetailsCard details={details} uploadedHandler={uploadedHandler} setProg={props.setProg}></DetailsCard> ) : (
                                <NoTranscript uploadedHandler={uploadedHandler} setProg={props.setProg}></NoTranscript>
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
                </div>
        </div>
    );

}

export default StudentProfile;
