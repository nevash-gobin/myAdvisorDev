import React, { Component } from "react";
import CareerCheck from './CareerCheck';
import "../assets/css/Career.css";
import { Link } from 'react-router-dom'

class Career extends Component {
  render() {

    const careers = ["Data Scientist", "Software Tester", "Web Developer", "Systems Analyst", "Business Analyst", "Software Engineer", "Software Developer", "Database Administrator", "User Interface Designer", "Mobile Application Designer/Developer", "Machine Learning/Artificial Intelligence Developer", "Product Owner", "Cloud Computing Engineer"]

    return (
      <div className="content">
            <div className="container-fluid">
            <p className="header blue-txt">Career Path</p>
                <form>
                    <div className="card details-card outer-card">
                        <div className="card-body career-card custom-scroll">
                            <p className="career-card-text">Select any career paths you may be interested in pursuing</p>
                            <CareerCheck count={careers.length} career={careers}></CareerCheck>
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
}

export default Career;
