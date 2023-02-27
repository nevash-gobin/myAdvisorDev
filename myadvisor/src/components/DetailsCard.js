import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';

class DetailsCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null, // Store file uploaded by user
            editing: false // Boolean to determine if the user is reuploading their transcript or not
        }
       props.setProg(20); // Set degree progress to 20%
    }

    // Function that runs when the user clicks to re-upload their transcript or to cancel re-upload
    editingHandler = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    // Function that runs when the user uploads a file
    onChangeHandler = event =>{
        this.setState({
            file: event.target.files[0]
        })
    }

    // Functions that runs when the user clicks the "Upload" button
    onClickHandler = () => {
        var formdata = new FormData();
        if (this.state.file === null) { // If no file has been uploaded, do nothing
            return;
        }
        formdata.append("file", this.state.file, "[PROXY]"); // Add file to FormData object, Proxy is only used in development to connect to node server

        var requestOptions = { // Create DELETE request
          method: 'DELETE',
          redirect: 'follow'
        };

        var studentId = localStorage.getItem("username"); // Get username from localStorage

        toast.success("Processing transcript...") // Make toast to let user know their transcript is being processed
        
        fetch(`/transcript/courses/deleteAll/${studentId}`, requestOptions) // Make request to server to delete all of a student's related courses from the database
            .then(response => response.text())
            .then(result => console.log(result))
            .then(result => {
                fetch(`/transcript/details/delete/${studentId}`, requestOptions) // Then make request to server to delete all of a student's details from the database
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(result => {
                        var requestOptions = { // Create POST request
                            method: 'POST',
                            body: formdata,
                            redirect: 'follow'
                        };
            
                        fetch("/transcript/parseForm", requestOptions) // Then make request to server to parse transcript, upload student details and thei r courses to the database
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .then(result => this.props.uploadedHandler()) // Once the data has been saved to the database, run uploadedHandler from StudentProfile
                            .catch(error => console.log('error', error));        
                    })
                    .catch(error => console.log('error', error));        
            })
          .catch(error => console.log('error', error));
	}


    render() {
        return (
            <div>
                <div className="card details-card">
                    <div className="card-body">
                        {!this.state.editing ? (
                            <div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Student Name:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">{this.props.details.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Student ID:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">{this.props.details.studentId}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Degree:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">{this.props.details.degree}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Major:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">{this.props.details.major}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Degree GPA:</p>
                                    </div>
                                    <div className="col-md-1 col-sm-2">
                                        <p className="row-info">{this.props.details.gpa}</p>
                                    </div>
                                    { this.props.details.gpa < 2 && this.props.details.gpa != 0 ? (
                                        <div className="col-md-9 col-sm-8">
                                            <p className="row-warning"> Your GPA is below 2.0 and you are on Academic Warning. Please visit the Dean's Office to be Advised. </p>
                                        </div>
                                    ) : (null) }
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="row-title blue-txt">Admit Term:</p>
                                    </div>
                                    <div className="col-sm-10">
                                        <p className="row-info">{this.props.details.admitTerm}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 edit-line">
                                        <i class="fas fa-pencil-alt blue-txt"> </i>
                                        <span className="edit-transcript blue-txt" onClick={this.editingHandler}> Re-upload Transcript</span>
                                    </div>
                                </div>
                            </div>
                            ) : (

                            <div>
                                <p className="row-info">Upload your new transcript.</p>
                                <div class="input-field col-sm-12">
                                    <form action="" enctype="multipart/form-data" method="POST">
                                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                                        <input type="button" value="Upload" class="btn btn-custom blue-btn" onClick={this.onClickHandler}/>
                                    </form>
                                </div>
                                <div className="row back-button-row">
                                    <div className="col-sm-2">
                                        <button type="submit" class="btn btn-custom back-button blue-button" onClick={this.editingHandler}>Cancel</button>
                                    </div>
                                </div>
                            </div>

                            ) }
                    </div>
                    <ToastContainer 
                        pauseOnHover
                        position="top-left"
                        autoClose={10000}
                    />
                </div>
            </div>
        );
    }
}

export default DetailsCard;
