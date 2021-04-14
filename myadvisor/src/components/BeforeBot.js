import React, { Component } from "react";
import "../assets/css/Finish.css";
import { Link } from 'react-router-dom'

class BeforeBot extends Component {
  render() {
    return (
      <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10">
                        <div className="card almost-card">
                            <div className="card-body">
                                <p className="almost-header blue-txt">You're almost done!</p>
                                <p className="almost-text">Would you like to talk to the myAdvisor chatbot for any additional questions?</p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Link to="/bot">
                                            <button type="submit" class="btn btn-custom blue-button">Yes, I would like to talk to the bot</button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link to="/finish">
                                            <button type="submit" class="btn btn-custom blue-button">No, finish advising</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default BeforeBot;
