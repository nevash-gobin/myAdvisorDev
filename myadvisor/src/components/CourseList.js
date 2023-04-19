import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import CourseNode from './CourseNode'
import PullCourses from "./PullCourses";
import "../assets/css/Courses.css";
import CourseDetails from "./CourseDetails";
import { Link } from 'react-router-dom'

const CourseList = (props) => { 
    const [all, setAll] = useState(true); // Boolean value used to determine whether or not to show all recommended courses
    const [core, setCore] = useState(false); // Boolean value used to determine whether or not to show all core courses for that semester and level
    const [career, setCareer] = useState(false); // Boolean value used to determine whether or not to show all recommended courses with career tags based on what the usere chose in the career page
    const [chosen, setChosen] = useState(false); // Boolean value used to determine whether or not to show all courses that user added using the Add checkbox 

    const history = useHistory(); // Used to redirect to a new path without losing state values

    var courses = PullCourses(); // Retrieve all courses from the database

    let recCourses = undefined; // Variable to store recommended courses determined on StudentProfile.js
    let careerRecCourses = undefined; // Variable to store recommended courses based on careers chosen determined on Career.js
    
    //console.log("Hello " + props.recCourses);
    if (props.recCourses) { // If user's recommended courses have been generated from student details page
      recCourses = props.recCourses;
      
    }
    else { // If the user's recommended courses has been lost, redirect to start page to generate them again
      history.push({
        pathname: '/start'
      })
    }

    if (props.careerRecCourses) { // If user's recommended courses based on careers chosen have been generated
      careerRecCourses = props.careerRecCourses;
    }
    else {
      careerRecCourses = [];
    }

    useEffect(() => {
      props.setProg(60); // Set advising progress to 60%
      props.setHidden(false); // Indicate that to not hide the back button
      props.setDisplay(false); // Indicate that to hide the "Begin Advising" button on the sidebar
      props.setShowBotButtons(false); // Hide "Back to courses" and "Finish advising" buttons on sidebar
    });

    // Function that runs when the "All Courses" tab is clicked
    function allClick() {
      if (core || career || chosen) { // If any other tab is currently open, set them to false and show all courses
        setAll(true);
        setCore(false);
        setCareer(false);
        setChosen(false);
      }
    }

    // Function that runs when the "Core Courses" tab is clicked
    function coreClick() {
      if (all || career || chosen) { // If any other tab is currently open, set them to false and show core courses
        setAll(false);
        setCore(true);
        setCareer(false);
        setChosen(false);
      }
    }

    // Function that runs when the "Career Specific Courses" tab is clicked
    function careerClick() {
      if (core || all || chosen) { // If any other tab is currently open, set them to false and show career specific courses
        setAll(false);
        setCore(false);
        setCareer(true);
        setChosen(false);
      }
    }

    // Function that runs when the "Your Chosen Courses" tab is clicked
    function chosenClick() {
      if (core || all || career) { // If any other tab is currently open, set them to false and show user's chosen courses
        setAll(false);
        setCore(false);
        setCareer(false);
        setChosen(true);
      }
    }

    //Function to calculate chosen courses credits
    function calculateChosenCourseCredits(chosenCoursesArr, coursesArr){
      var chosenCourseCreds = 0;
      var coursesChoseNCreds = [];
      Array.from({ length: coursesArr.length }, (_, k) => {
          if (chosenCoursesArr.includes(coursesArr[k].courseCode)) {
              chosenCourseCreds = chosenCourseCreds + coursesArr[k].credits;
              const obj = {
                            courseCode: coursesArr[k].courseCode,
                            credits: coursesArr[k].credits
                          };
              coursesChoseNCreds.push(obj);
          }
      })
      props.setCourseChoseNCredits(coursesChoseNCreds);
      return chosenCourseCreds;
  }

    // Function that runs when the Add checkbox is checked or unchecked
    function onChange(event, courseCredits) { 
      var chosenArray = props.chosenCourses;
      var clear = false; // Boolean value to indicate if chosenArray has multiple copies of a chosen course
      if (event.currentTarget.checked === true) { // If the checkbox was checked
        chosenArray.push(event.currentTarget.value); // Add course to chosenArray
        props.setNewDegProg(props.newDeg + courseCredits); // Add the course credits to the new degree progress
      }
      else { // If the checkbox was unchecked
        while (!clear) { // While there is multiple copies of a chos en course in chosenArray
          var index = chosenArray.indexOf(event.currentTarget.value); // Find index of the course that was unchecked
          if (index > -1) { // If the course was in the array
            chosenArray.splice(index, 1); // Remove course from the array
            props.setNewDegProg(props.newDeg - courseCredits); // Remove the course credits from the new degree progress
          }
          else { // If the course was not in the array
            clear = true;
          }
        }
        clear = false;
      }
      props.setChosen(chosenArray);

      props.setChosenCoursesCredits(calculateChosenCourseCredits(props.chosenCourses, courses));
    }

    return (
      <div className="content">
            <div className="container-fluid">
            <div className="row">
              <div className="col-sm-10">
                <p className="header blue-txt">Select Courses</p>
                <div className="card details-card outer-card">
                    <div className="card-body">
                        <p className="courselist-card-text">Click on a course to see more details</p>
                        <p className="courselist-card-text">Check the Add box if you are interested in pursuing a course</p>
                        <div className="row tab-group">
                          { all ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={allClick}>All Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={allClick}>All Courses</button>
                            </div>

                          ) }
                          { core ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={coreClick}>Core Courses</button>
                            </div> ) : ( 
                            
                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button fade-button" onClick={coreClick}>Core Courses</button>
                            </div>

                          ) }
                          { career ? (

                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={careerClick}>Career Specific Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                             <button type="button" class="btn btn-custom tab-button fade-button" onClick={careerClick}>Career Specific Courses</button>
                            </div>
                          ) }
                          { chosen ? (
                            <div className="col-sm-3">
                              <button type="button" class="btn btn-custom tab-button blue-button" onClick={chosenClick}>Your Chosen Courses</button>
                            </div> ) : (

                            <div className="col-sm-3">
                            <button type="button" class="btn btn-custom tab-button fade-button" onClick={chosenClick}>Your Chosen Courses</button>
                            </div>
                          ) }
                        </div>
                        <div className="card courselist-card custom-scroll">
                            <div className="card-body">{
                              all ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (recCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : core ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (recCourses.includes(courses[k].courseCode) && courses[k].type === "Core") {
                                  return <CourseNode course={courses[k]} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : career ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (careerRecCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : chosen ? (
                              Array.from({ length: courses.length }, (_, k) => {
                                if (props.chosenCourses.includes(courses[k].courseCode)) {
                                  return <CourseNode course={courses[k]} onChange={onChange} chosen={props.chosenCourses}></CourseNode>    
                                }
                              }) 
                              ) : (null)
                            }
                            </div>
                        </div>
                    </div>
                </div>
                { props.showBackBtn ? (
                  <div className="row button-row">
                      <div className="col-sm-2">
                        <Link to="/career">
                          <button type="submit" class="btn btn-custom back-button blue-button">Back</button>
                        </Link>
                      </div>          
                      <div className="col-sm-2 offset-sm-8">
                      <Link to="/almostdone">
                        <button type="submit" class="btn btn-custom next-button blue-button">Next</button>
                        </Link>
                      </div>
                  </div>
                ) : (
                  <div className="row button-row">        
                      <div className="col-sm-2 offset-sm-8">
                        <Link to="/almostdone">
                          <button type="submit" class="btn btn-custom next-button blue-button">Next</button>
                        </Link>
                      </div>
                  </div>
                ) }
            </div>
            </div>
            </div>
      </div>
    );
  
}

export default CourseList;
