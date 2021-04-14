import React, { Component } from "react";
import "../assets/css/Finish.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const Finish = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values
    // If the user's recommended courses has been lost, redirect to start page to generate them again
    if (props.recCourses === null) { 
        history.push({
        pathname: '/start'
        })
    }

    props.setProg(100); // Set advising progress to 100%

    

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
