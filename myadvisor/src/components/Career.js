import React, { Component } from "react";
import { useEffect, useState } from "react";
import CareerCheck from './CareerCheck';
import "../assets/css/Career.css";
import { Link } from 'react-router-dom'
import PullCareers from "./PullCareers";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Career = (props) => {

  const [careerList, setCareerList] = useState([]); // Array used to store careers that a user selected
  const [loading, setLoading] = useState(false); // Boolean used to indicate whether or not the recommended courses for the user has been updated

  var careers = PullCareers(); // Get all careers from the database
  const history = useHistory(); // Used to redirect to a new path without losing state values
  props.setDisplay(false); // Indicate that to hide the "Begin Advising" button on the sidebar
  props.setProg(40); // Set advising progress to 40%

  // If the user's recommended courses has been lost, redirect to start page to generate them again
  if (props.recCourses === null) { 
    history.push({
      pathname: '/start'
    })
  }

  // Function that runs when the user checks or unchecks a checkbox
  function onChange(event) { 
    var careerArray = careerList; // Duplicate items in careerList
    if (event.currentTarget.checked === true) { // If the box is checked then add that career to careerArray
      careerArray.push(event.currentTarget.value);
    }
    else { // If the box is unchecked then remove that career from careerArray
      var index = careerArray.indexOf(event.currentTarget.value); // Find index of the specified career
      if (index > -1) { // If career is in the array
        careerArray.splice(index, 1); // Remove the career from the array
      }
    }
    setCareerList(careerArray); // Set careerList to careerArray
  }

  // Function that runs when the user clicks the "Next" button
  function onClick() {
    setLoading(true);
    determineCourses(careerList);
  }

  // Function to fetch courses that are associated with a given career
  async function getCareerCourses(id) {
    try {
      const {data:response} = await axios.get(`/careers/courses/${id}`) //use data destructuring to get data from the promise object
      return response
    }
    catch (error) {
      console.log(error);
    }
  }

  // Function to filter the fetched courses based on the current semester and user's current level
  async function determineCourses(careerArray){

      var recCourses = []; // Array to store the recommended courses for the user
      var today = new Date(); // Today's date
      var currentSem; // Student's current semester
      var level; // Student's current level
      
      if (today.getMonth() < 4) { // If the date is currently between January and April
          currentSem = "2";
      }
      else if (today.getMonth() < 6) { // If the date is currently between May and July
          currentSem = "3";
      }
      else { // If the date is currently between August and December
          currentSem = "1";
      }

      // props.year is the student's current year determined in StudentProfile.js
      if (props.year === 1) {
        level = "I";
      }
      else if (props.year === 2) {
        level = "II";
      }
      else if (props.year === 3) {
        level = "III"
      }
      else {
        level = "I";
      }

      // Iterate through careerArray
      for (var i=0; i<careerArray.length; i++) {
        var courses = await getCareerCourses(careerArray[i]); // Retrieve courses given with the iterated career
        for (var j=0; j<courses.length; j++) { // Iterate through courses retrieved
          if (courses[j].semester === currentSem && courses[j].level === level) { // If the course corresponds with the current semester and current level
            recCourses.push(courses[j].courseCode); // Add course to recommended courses array
          }
        }
    }
    props.setCareerRecommended(recCourses); // Set global state of recommended courses based on career

    // Route user to courses page
    history.push({ 
      pathname: '/courses'
    })

  }


  return (
    <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-10">
                <p className="header blue-txt">Career Path</p>
                  <form>
                    <div className="card details-card outer-card">
                      <div className="card-body career-card custom-scroll">
                        <p className="career-card-text">Select any career paths you may be interested in pursuing</p>
                          <table class="table table-borderless table-striped">
                            <thead>
                                <tr class="d-flex blue-txt">
                                    <th class="col-3 name-header">Career Title</th>
                                    <th class="col-9 desc-header">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                              <CareerCheck careers={careers} onChange={onChange}></CareerCheck>
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div className="row button-row">
                      <div className="col-sm-2">
                        <Link to="/home">
                          <button type="submit" class="btn btn-custom back-button blue-button">Back</button>
                        </Link>
                      </div>
                      { loading ? (
                        <div className="col-sm-2">
                          <CircularProgress className="circ-prog career-prog" size={30}/>
                        </div>
                      ) : (null)}
                      { loading ? (
                        <div className="col-sm-2 offset-sm-6">
                          <button type="button" class="btn btn-custom next-button blue-button" onClick={onClick}>Next</button>
                        </div> ) : (
                        <div className="col-sm-2 offset-sm-8">
                          <button type="button" class="btn btn-custom next-button blue-button" onClick={onClick}>Next</button>
                        </div>
                        ) }
                    </div>
                  </form>
                </div>
              </div>
          </div>
    </div>
  );
}

export default Career;
