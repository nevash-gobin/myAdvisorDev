import React, { Component } from "react";
import "../assets/css/Start.css";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import PullProgrammes from "./PullProgrammes";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

const Start = (props) => { 

    const [radio, setRadio] = useState(null);
    const [programme, setProgramme] = useState("None");
    const [loading, setLoading] = useState(false);

    props.setHidden(true);
    var programmes = PullProgrammes();

    const history = useHistory();

    const onClickFunction = () => {
        setLoading(true);
        for (var i=0; i<programmes.length; i++) {
            if (programmes[i].name == programme) {
                var programmeId = programmes[i].id;
            }
        }
        if (programmeId) {
            determineCourses(programmeId);
        }
    }

    async function getProgrammeCourses(id) {
        try {
          const {data:response} = await axios.get(`/programmes/offered-courses/${id}`) //use data destructuring to get data from the promise object
          return response
        }
    
        catch (error) {
          console.log(error);
        }
    }

    async function determineCourses(programmeId){

        var recCourses = [];
        var today = new Date();
        var currentSem;
        
        if (today.getMonth() < 4) {
            currentSem = "2";
        }
        else if (today.getMonth() < 6) {
            currentSem = "3";
        }
        else {
            currentSem = "1";
        }

        var courses = await getProgrammeCourses(programmeId);

        for (var i=0; i<courses.length; i++) {
            if (courses[i].type === "Core" && courses[i].semester === currentSem && courses[i].level === "I") {
                recCourses.push(courses[i].courseCode);
            }
        }

        props.setRecommended(recCourses);
    
        history.push({
            pathname: '/courses'
        })
        
    }


    function onRadioChange(event) { 
        setRadio(event.currentTarget.value);
        if (event.currentTarget.value === "new") {
            props.setDegProg(0);
            props.setCreds(93);
            props.setShowBack(false);
        }
    }

    function onSelectChange(event) { 
        setProgramme(event.currentTarget.value);
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
                                <input class="form-check-input" type="radio" name="studentRadio" id="studentRadiosCont" value="cont"  onChange={onRadioChange}/>
                                <label class="form-check-label" for="studentRadiosCont">
                                    I am a continuing student
                                </label>
                            </div>
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
