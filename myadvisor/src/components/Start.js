import React, { Component } from "react";
import "../assets/css/Start.css";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import PullProgrammes from "./PullProgrammes";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

const Start = (props) => { 

    const [radio, setRadio] = useState(null); // Store which radio was selected
    const [programme, setProgramme] = useState("None"); // Store which programme was selected
    const [loading, setLoading] = useState(false); // Boolean used to indicate whether or not the recommended courses for the user has been generated

    props.setHidden(true); // Hide the sidebar
    props.setShowBotButtons(false); // Hide "Back to courses" and "Finish advising" buttons on sidebar
    var programmes = PullProgrammes(); // Get all degree programmes from the database

    const history = useHistory(); // Used to redirect to a new path without losing state values

    // Function that runs when the next button is clicked and the user is a new student
    const onClickFunction = () => {
        setLoading(true);

        // Iterate through all programmes
        for (var i=0; i<programmes.length; i++) {
            if (programmes[i].name == programme) { // If programme is the one that the user selected
                var programmeId = programmes[i].id;
            }
        }
        if (programmeId) { // If programme was found
            determineCourses(programmeId); // Generate recommended courses
        }
    }

    // Function to fetch courses that are associated with a given programme
    async function getProgrammeCourses(id) {
        try {
          const {data:response} = await axios.get(`/programmes/offered-courses/${id}`) //use data destructuring to get data from the promise object
          //console.log(response);
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

    // Function to generate list of recommended courses for a new student
    async function determineCourses(programmeId){

        var recCourses = []; // Array to store the recommended courses for the user
        var today = new Date(); // Today's date
        var currentSem; // Student's current semester
        
        if (today.getMonth() < 4) { // If the date is currently between January and April
            currentSem = "2";
        }
        // else if (today.getMonth() < 6) { // If the date is currently between May and July
        //     currentSem = "1";
        // }
        else { // If the date is currently between August and December
            currentSem = "1";
        }

        var courses = await getProgrammeCourses(programmeId);
        //console.log(courses);

        // Iterate through courses
        for (var i=0; i<courses.length; i++) {

            // Get core level I courses for the current semester
            if (courses[i].type === "Core" && courses[i].semester === currentSem && courses[i].level === "I") {
                recCourses.push(courses[i].courseCode);
            }
        }

        props.setRecommended(recCourses); // Set global state of recommended courses
        //console.log("Hi "+recCourses);
        
        // Route user to courses page
        history.push({
            pathname: '/courses'
        })
        
    }

    // Function that runs when a radio button is selected
    function onRadioChange(event) { 
        setRadio(event.currentTarget.value); // Set radio state to value of the radio selected
        if (event.currentTarget.value === "new") { // If the user is a new student
            props.setDegProg(0); // Set degree progress to 0
            props.setCreds(93); // Set remaining credits for student to 93
            props.setShowBack(false); // Hide back button on career page
        }
    }

    // Function that runs when an option in the dropdown is selected
    function onSelectChange(event) { 
        setProgramme(event.currentTarget.value); // Set programme state to value of option
        localStorage.setItem("programme", event.currentTarget.value); // Set localStorage item to value of option
        props.setStudentProgramme(event.currentTarget.value); // Set global student programme state to value of option
    }

 
    return (
        <div className="content">
                <div className="container-fluid">
                    <div className="header">
                        <p className="welcome blue-txt">Welcome to myAdvisor</p>
                        <p className="started blue-txt">Let's get started.</p>
                    </div>
                    <div className="card start-card">
                        <div className="card-body">
                        <div class="form-check">
                                <input class="form-check-input" type="radio" name="studentRadio" id="studentRadiosNew" value="new"  onChange={onRadioChange}/>
                                <label class="form-check-label new-label" for="studentRadiosNew">
                                    I am a new student in my first semester of my programme
                                </label>
                                { radio === "new" ? (
                                    <div className="row select-row">
                                        <div className="col-sm-6">
                                            <div class="form-group">
                                                <select class="form-control" id="exampleFormControlSelect1" onChange={onSelectChange}>
                                                <option value="None">Select your programme</option>
                                                {
                                                 Array.from({ length: programmes.length }, (_, k) => {
                                                    return <option value={programmes[k].name}>{programmes[k].name}</option> 
                                                })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    ) : (null) }
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="studentRadio" id="studentRadiosCont" value="cont"  onChange={onRadioChange}/>
                                <label class="form-check-label" for="studentRadiosCont">
                                    I am a continuing student
                                </label>
                                { radio === "cont" ? (
                                    <div className="row select-row">
                                        <div className="col-sm-6">
                                            <div class="form-group">
                                                <select class="form-control" id="exampleFormControlSelect1" onChange={onSelectChange}>
                                                <option value="None">Select your programme</option>
                                                {
                                                 Array.from({ length: programmes.length }, (_, k) => {
                                                    return <option value={programmes[k].name}>{programmes[k].name}</option> 
                                                })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    ) : (null) }
                            </div>
                        </div>
                        <div className="row">
                        { radio === "new" && programme !== "None" ? (

                                <div className="col-sm-2">
                                    <button type="submit" class="btn btn-custom start-next-button blue-button" onClick={onClickFunction}>Next</button>
                                </div>
                            ) :

                            radio === "new" && programme === "None" ? (
                            <div className="col-sm-2">
                                <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                            </div>) : 
                            
                            radio === "cont" ? (
                              <div className="col-sm-2">
                                <Link to="/home">
                                  <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                                </Link>
                              </div>
                            ) : 

                            (
                              <div className="col-sm-2">
                                  <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                              </div>
                            )
                        }
                        { loading ? (
                            <div className="col-sm-2">
                                <CircularProgress className="circ-prog start-prog" size={30}/>
                            </div>
                        ) : (null)
                        }
                        </div>
                    </div>
                </div>
        </div>
        );
    
}

export default Start;
