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

  const [careerList, setCareerList] = useState([]);
  const [loading, setLoading] = useState(false);

  var careers = PullCareers();
  const history = useHistory();
  props.setDisplay(false);
  props.setProg(40);

  function onChange(event) { 
    var careerArray = careerList;
    if (event.currentTarget.checked === true) {
      careerArray.push(event.currentTarget.value);
    }
    else {
      var index = careerArray.indexOf(event.currentTarget.value);
      if (index > -1) {
        careerArray.splice(index, 1);
      }
    }
    setCareerList(careerArray);
  }

  function onClick() {
    setLoading(true);
    determineCourses(careerList);
  }

  async function getCareerCourses(id) {
    try {
      const {data:response} = await axios.get(`http://localhost:5000/careers/courses/${id}`) //use data destructuring to get data from the promise object
      return response
    }
    catch (error) {
      console.log(error);
    }
}

async function determineCourses(careerArray){

  var recCourses = [];
  var today = new Date();
  var currentSem;
  var level;
  
  if (today.getMonth() < 4) {
      currentSem = "2";
  }
  else if (today.getMonth() < 6) {
      currentSem = "3";
  }
  else {
      currentSem = "1";
  }

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

  for (var i=0; i<careerArray.length; i++) {
    var courses = await getCareerCourses(careerArray[i]);
    for (var j=0; j<courses.length; j++) {
      if (courses[j].semester === currentSem && courses[j].level === level) {
        recCourses.push(courses[j].courseCode);
      }
    }
  }

  console.log("CAR Here", recCourses);
  props.setCareerRecommended(recCourses);
  
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
