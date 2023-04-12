import React, { Component } from "react";
import "../assets/css/Finish.css";
import { useHistory } from 'react-router-dom';
//import axios from "axios";
import PullCourses from "./PullCourses";
import { useEffect, useState } from "react";

const Finish = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values
    const [uploaded, setUploaded] = useState(false); // Boolean value to indicate whether or not the advising session has been uploaded
    
    const transcriptDets = props.transcriptDetails;
    
    var totalCreditsCompleted = parseInt(props.studCredComplete) + parseInt(props.newDeg) + parseInt(props.courseInProgCredits); //this is a potential total number of credits completed
    var gradeCombinations; //2D array to contain grade combination
    var coursesNCredits = [...props.courseInProgNCreds, ...props.courseChoseNCreds];//join two arrays
    //console.log(coursesNCredits);

    //console.log(transcriptDets);

    var combinedDegreeGpa; //estimated gpa calculated using prior gpa and current gpa

    //An array containing the grades and their quality points
    const gradesArray = [ {grade: 'A+', qualityPoints: 4.3}, 
                          {grade: 'A', qualityPoints: 4.0},
                          {grade: 'A-', qualityPoints: 3.7},
                          {grade: 'B+', qualityPoints: 3.3},
                          {grade: 'B', qualityPoints: 3.0},
                          {grade: 'B-', qualityPoints: 2.7},
                          {grade: 'C+', qualityPoints: 2.3},
                          {grade: 'C', qualityPoints: 2.0},
                          //{grade: 'F1', qualityPoints: 1.7},
                          //{grade: 'F2', qualityPoints: 1.3},
                          //{grade: 'F3', qualityPoints: 0.0},
                        ];

    for(var i=0;i<8;i++){

    }

    // If the user's recommended courses has been lost, redirect to start page to generate them again
    if (props.recCourses === null) { 
        history.push({
        pathname: '/start'
        })
    }


    /*
        Calculate potential gpa and potential degree class
    */

    /*
        priorDegGpaHrs - Prior Degree GPA Hours
        priorDegGpa - Prior Degree GPA
        currDegGpaHrs - Current Degree GPA Hours
        currDegGpa - Current Degree GPA

        FORMULA:
        Combined Degree GPA = ((Prior Degree GPA Hours x Prior Degree GPA) + 
                                (Current Degree GPA Hours x Current Degree GPA)) / 
                                (Prior Degree GPA Hours + Current Degree GPA Hours)
    */
    

    //Function to calculate current degree gpa hours
    function calculateCurrentDegreeGpaHrs(chosenCourseCreds, inProgCourseCreds){
        var currDegGpaHrs = chosenCourseCreds + inProgCourseCreds;
        return currDegGpaHrs;
    }

    //Function to calculate current degree gpa
    function calculateCurrentDegreeGpa(totGradePtsEarned, totQualityPts){
        var currDegGpa = totGradePtsEarned / totQualityPts;
        return currDegGpa;
    }
    
    //function to calculate estimated gpa
    function calculateCombinedDegreeGpa(priorDegGpaHrs, priorDegGpa, currDegGpaHrs, currDegGpa){
        var estimatedGPA = ((priorDegGpaHrs * priorDegGpa) + (currDegGpaHrs * currDegGpa)) / (priorDegGpaHrs + currDegGpaHrs);
        return estimatedGPA;
    }
    //console.log(calculateCombinedDegreeGpa(60.00, 3.00, 3.00, 4.00).toFixed(2));

    //Function to calculate grade points for a course
    function calculateGradePoints(gradeQualityHrs, gradeQualityPts){
        const gradePoints = gradeQualityHrs * gradeQualityPts;
        return gradePoints;
    }

    //Function to create grade combinations based on the number of courses a student is pursuing for the semester
    function createGradeCombination(combine2DArray, coursesArr, numCourses, gradeArr, gradeArrSize){
        combine2DArray = Array(gradeArrSize*numCourses).fill(0).map(row => new Array(numCourses).fill(1)); //initialize
        //combine2DArray = Array(gradeArrSize).map(row => new Array(numCourses));

        //coursesArr.map(course => {//traverse through course array
        //});

        var index = 0;
        var decrease = 0;
        //var gradeEnd = gradeArr.length;
        //var [index, setIndex] = useState(0); 

        var combine2DArray2 = combine2DArray.map((array1, i) => //in first dimension
            //console.log(i),
            array1.map((array2, j) => { //in second dimension
                //console.log(array1.length); //5
                //console.log(j);
                if(index<gradeArrSize){
                    const grade = gradeArr[index].grade;
                    if(j===numCourses-1){
                        index = index + 1;
                    }
                    
                    return grade;
                }

                else{
                    index = 0;
                    const grade = gradeArr[index].grade;
                    return grade;
                }
                
                
                //index = index + 1;
                //return gradeArr[index].grade;
            
                
                //return j;
            }),
            //index = index + 1
        
            
            
        
            
        );

        /*
        var combine2DArray3 = gradeArr.map((gradeItem, k) => {
            combine2DArray.map((array1, i) => //in first dimension
                //console.log(i);
                array1.map((array2, j) => { //in second dimension
                    return gradeItem;
                    //return j;
                }
            ))
        
        });
        */

        //console.log(combine2DArray);
        return combine2DArray2;
    }

    console.log(createGradeCombination(gradeCombinations, coursesNCredits, 2, gradesArray, gradesArray.length));

    //function to calculate the potential degree gpa for the semester
    function calculateSemPotentialGpa(){
        const priorDegGpaHrs = transcriptDets.degreeGpaHours; //found on transcript
        const priorDegGpa = transcriptDets.gpa; //found on transcript
        //console.log(priorDegGpaHrs);

        var inProgressCourseCredits = props.courseInProgCredits; //total credit for in progress courses
        var chosenCourseCredits = props.chosenCoursesCreds; //total credits for chosen courses

        var currDegGpaHrs = calculateCurrentDegreeGpaHrs(chosenCourseCredits, inProgressCourseCredits); //total credits of courses that you are pursuing this semester (including inprogress course & course chosen for advising)
        
        
        //const currDegGpa = ; //need to know how much courses user doing this sem
        //need credits and quality points for each cours
        //console.log(priorDegGpa);
    }
    //calculateSemPotentialGpa();

    useEffect(() => {
        props.setProg(100); // Set advising progress to 100%
        props.setShowBotButtons(false); // Hide "Back to courses" and "Finish advising" buttons on sidebar
        //setTotCredComplete(parseInt(props.studCredComplete) + parseInt(props.newDeg) + parseInt(props.courseInProgCredits));//add the credits the student completed so far to the course credits that the student selected from advising 
        
        //getAllPotentialGraduate();
        //console.log("1");
        
        /*
        
        async function getPotentialGraduate() {
            try{
                const res = await fetch("/student/a-potential-graduate/" + localStorage.getItem("username"));
                const parseData = await res.json();
                setPotentialGrad(parseData);
            }
            catch(err){
                console.log("Error: " + err.message);
            }
            /*
            fetch("/student/a-potential-graduate/" + localStorage.getItem("username"))
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPotentialGrad(data);
                })
                .catch((err) =>{
                    console.log(err.message);
                });
            */
               
        //}
        
        //getPotentialGraduate();
        
        
    }, []);
    
    useEffect(() => {
        if (!uploaded) { // If advising session has not yet been uploaded
            var requestOptions = { // Create POST request
                method: 'POST',
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
                redirect: 'follow'
            };

            fetch(`/student/academic-advising/session/${localStorage.getItem("username")}`, requestOptions) // Make request to server to parse transcript, upload student details and their courses to the database
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            
            setUploaded(true);
        }

        if(totalCreditsCompleted >= 93){
            if(!props.gradUploaded){//if potential graduate has not been uploaded to database yet
                var requestOptions = { // Create POST request
                    method: 'POST',
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-type": "application/json",
                    },
                    redirect: 'follow'
                };
                fetch(`/student/potential-graduate/${localStorage.getItem("username")}`, requestOptions) // Make request to server to upload potential graduate
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                
                props.setGradUploaded(true); 
            }
        }
        
        if((totalCreditsCompleted >= 0 && totalCreditsCompleted < 93)){
            var requestOptions = { // Create POST request
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`/student/potential-graduates/all`, requestOptions) // Make request to server to get all potential graduate
                .then(response => response.json())
                .then((data) => {
                    let graduates = data;

                    if(graduates!==null){
                        graduates.map(function(graduate){ 

                            if(graduate.studentId === parseInt(localStorage.getItem("username"))){ //if potential graduate found in database
                                var requestOptions2 = {//create DELETE request
                                    method: 'DELETE',
                                    headers: {
                                        token: localStorage.getItem("token")
                                    }
                                };

                                fetch(`/student/potential-graduate/delete/${localStorage.getItem("username")}`, requestOptions2) //delete potential graduate
                                    .then(response => response.text())
                                    .then(result => console.log(result))
                                    .catch(error => console.log('error', error));
                            }
                            
                        })
                    }
                })
                .catch(error => console.log('error', error));
        }
    }, [totalCreditsCompleted]);

    // async function uploadAdvisingSession() {
    //     try {
    //       const {data:response} = await axios.post(`/student/academic-advising/session/${localStorage.getItem("username")}`) //use data destructuring to get data from the promise object
    //       return response
    //     }
    //     catch (error) {
    //       console.log(error);
    //     }
    // }


    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10">
                        <div className="card almost-card">
                            <div className="card-body">
                                <p className="almost-header blue-txt">You're all done with advising!</p>
                                <p className="almost-text">Here's a list of all the courses you chose:</p>
                                {
                                    Array.from({ length: props.chosenCourses.length }, (_, k) => {
                                        return <p className="course-chosen blue-txt">{props.chosenCourses[k]}</p>
                                    })
                                }
                            </div>

                            <div className="card body-tips" >
                                <p className="almost-header2">Potential Degree Class:</p>
                                <p className="almost-text2">Here's a list of all the courses you chose:</p>
                            </div>
                                
                            

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default Finish;
