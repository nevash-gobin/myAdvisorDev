import React, { Component } from "react";
import "../assets/css/Finish.css";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const BeforeBot = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values

    function onClickHandler() {
        props.setShowBotButtons(true); // Show "Back to courses" and "Finish advising" buttons on sidebar
        history.push({
            pathname: '/bot'
        })
    }

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
                                        <button type="button" class="btn btn-custom blue-button" onClick={onClickHandler}>Yes, I would like to talk to the bot</button>
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

export default BeforeBot;
