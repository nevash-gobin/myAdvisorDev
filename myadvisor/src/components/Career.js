import React, { Component } from "react";
import CareerCheck from './CareerCheck';
import "../assets/css/Career.css";
import { Link } from 'react-router-dom'
import PullCareers from "./PullCareers";

const Career = () => {

  var careers = PullCareers();

  return (
    <div className="content">
          <div className="container-fluid">
          <p className="header blue-txt">Career Path</p>
              <form>
                  <div className="card details-card outer-card">
                    <div className="card-body career-card custom-scroll">
                      <p className="career-card-text">Select any career paths you may be interested in pursuing</p>
                        <table class="table table-borderless table-striped">
                          <thead>
                              <tr class="d-flex blue-txt">
                                  <th class="col-3 name-cell">Career Title</th>
                                  <th class="col-9 desc-cell">Description</th>
                              </tr>
                          </thead>
                          <tbody>
                            <CareerCheck careers={careers}></CareerCheck>
                          </tbody>
                        </table>
                      </div>
                  </div>
                  <div className="row">
                      <Link to="/courses">
                        <div className="col-sm-2">
                            <button type="submit" class="btn btn-custom career-next-button blue-button">Next</button>
                        </div>
                      </Link>
                  </div>
              </form>
          </div>
    </div>
  );
}

export default Career;
