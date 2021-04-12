import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';

class DetailsCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            data: null,
            editing: false
        }
       props.setProg(20);
    }

    handleFiles = files => {
        console.log(files[0])
        this.setState({
            file: files[0]
        });
        
    }

    editingHandler = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    onChangeHandler = event =>{
        this.setState({
            file: event.target.files[0]
        })
    }

    onClickHandler = () => {
        var formdata = new FormData();
        if (this.state.file === null) {
            return;
        }
        formdata.append("file", this.state.file, "[PROXY]");
        
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };

        var studentId = localStorage.getItem("username");

        toast.success("Processing transcript...")
        
        fetch(`/transcript/courses/deleteAll/${studentId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(result => {
                fetch(`/transcript/details/delete/${studentId}`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(result => {
                        var requestOptions = {
                            method: 'POST',
                            body: formdata,
                            redirect: 'follow'
                        };
            
                        fetch("/transcript/parseForm", requestOptions)
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .then(result => this.props.uploadedHandler())
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
