import React, { Component } from "react";
import CareerCheck from './CareerCheck';
import "../assets/css/Career.css";
import { Link } from 'react-router-dom'
import PullCareers from "./PullCareers";

const Career = (props) => {

  var careers = PullCareers();
  props.setDisplay(false);
  
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
                              <CareerCheck careers={careers}></CareerCheck>
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div className="row button-row">
                      <div className="col-sm-2">
                        <Link to="/home">
                          <button type="submit" class="btn btn-custom career-next-button blue-button">Back</button>
                        </Link>
                      </div>          
                      <div className="col-sm-2 offset-sm-8">
                      <Link to="/courses">
                        <button type="submit" class="btn btn-custom career-next-button blue-button">Next</button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
    </div>
  );
}

export default Career;
