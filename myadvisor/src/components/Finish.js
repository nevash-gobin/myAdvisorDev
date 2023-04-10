import React, { Component } from "react";
import "../assets/css/Finish.css";
import { useHistory } from 'react-router-dom';
//import axios from "axios";
import { useEffect, useState } from "react";

const Finish = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values
    const [uploaded, setUploaded] = useState(false); // Boolean value to indicate whether or not the advising session has been uploaded

    var totalCreditsCompleted = parseInt(props.studCredComplete) + parseInt(props.newDeg) + parseInt(props.courseInProgCredits); //this is a potential total number of credits completed

    // If the user's recommended courses has been lost, redirect to start page to generate them again
    if (props.recCourses === null) { 
        history.push({
        pathname: '/start'
        })
    }


    //Calculate potential gpa and potential degree class
    //console.log(props.transcriptDetails);

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
