import React, { Component } from "react";
import "../assets/css/Start.css";
import { Link } from 'react-router-dom'

class Start extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radio: null,
        }
    }

    onChange = event =>{
        this.setState({
            radio: event.currentTarget.value
        })
    }

    render() {
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
                                <input class="form-check-input" type="radio" name="studentRadio" id="studentRadiosNew" value="new"  onChange={this.onChange}/>
                                <label class="form-check-label" for="studentRadiosNew">
                                    I am a new student in my first semester of my programme
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="studentRadio" id="studentRadiosCont" value="cont"  onChange={this.onChange}/>
                                <label class="form-check-label" for="studentRadiosCont">
                                    I am a continuing student
                                </label>
                            </div>
                        </div>
                        <div className="row">
                        { this.state.radio === "new" ? (
                            <Link to="/courses">
                                <div className="col-sm-2">
                                    <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                                </div>
                            </Link>) : this.state.radio === "cont" ? (
                            <Link to="/home">
                              <div className="col-sm-2">
                                  <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                              </div>
                            </Link>  
                            ) : (
                              <div className="col-sm-2">
                                  <button type="submit" class="btn btn-custom start-next-button blue-button">Next</button>
                              </div>
                            )
                        }
                    </div>
                    </div>
                </div>
        </div>
        );
    }
}

export default Start;
