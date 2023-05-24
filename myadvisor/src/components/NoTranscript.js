import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NoTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null // Store file uploaded by user
        }
       props.setProg(0); // Set advising progress to 0%
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
        
        var requestOptions = { // Create POST request
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        toast.success("Processing transcript...") // Create a toast to let user know their transcript is being processed
        
        fetch("/transcript/parseForm", requestOptions) // Make request to server to parse transcript, upload student details and their courses to the database
          .then(response => response.text())
          .then(result => console.log(result))
          .then(result => this.props.uploadedHandler()) // Once the data has been saved to the database, run uploadedHandler from StudentProfile
          .catch(error => console.log('error', error));

	}

    

  render() {
    //console.log(this.props.calGpaDetails);
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <p className="row-info">No transcript has been uploaded, please upload your unofficial transcript to get started with advising.</p>
                    <div class="input-field col-sm-12">
                        <form action="" encType="multipart/form-data" method="POST">
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                            <input type="button" value="Upload" class="btn btn-custom blue-btn" onClick={this.onClickHandler}/>
                        </form>
                    </div>
                    <hr></hr>
                    <span className="row-info new-student">New student and don't have a transcript yet? </span>
                    <Link to="/start" onClick={this.props.newStudentHandler}>
                        <span className="row-info details-link new-student">Click here to get started</span>
                    </Link>
                    <ToastContainer 
                        pauseOnHover
                        position="top-left"
                        autoClose={10000}
                    />
                </div>
            </div>
      </div>
    );
  }
}

export default NoTranscript;
