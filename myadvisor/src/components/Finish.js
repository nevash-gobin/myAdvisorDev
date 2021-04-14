import React, { Component } from "react";
import "../assets/css/Finish.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const Finish = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values
    const [uploaded, setUploaded] = useState(false); // Boolean value to indicate whether or not the advising session has been uploaded
    
    // If the user's recommended courses has been lost, redirect to start page to generate them again
    if (props.recCourses === null) { 
        history.push({
        pathname: '/start'
        })
    }

    useEffect(async() => {
        props.setProg(100); // Set advising progress to 100%

        if (!uploaded) { // If advising session has not yet been uploaded
            var requestOptions = { // Create POST request
                method: 'POST',
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
                redirect: 'follow'
            };

            fetch(`/student/academic-advising/session/${localStorage.getItem("username")}`, requestOptions) // Make request to server to parse transcript, upload student details and thier courses to the database
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            
            setUploaded(true);
        }
    });

    async function uploadAdvisingSession() {
        try {
          const {data:response} = await axios.post(`/student/academic-advising/session/${localStorage.getItem("username")}`) //use data destructuring to get data from the promise object
          return response
        }
        catch (error) {
          console.log(error);
        }
      }
 

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default Finish;
