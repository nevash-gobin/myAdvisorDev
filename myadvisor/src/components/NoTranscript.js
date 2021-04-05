import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NoTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            data: null
        }
    }

    handleFiles = files => {
        console.log(files[0])
        this.setState({
            file: files[0]
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
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        toast.success("Processing transcript...")
        
        fetch("http://localhost:5000/transcript/parseForm", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(result => this.props.uploadedHandler())
          .catch(error => console.log('error', error));
	}

  render() {
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <p className="row-info">No transcript has been uploaded, please upload your unofficial transcript to get started with advising.</p>
                    <div class="input-field col-sm-12">
                        <form action="" enctype="multipart/form-data" method="POST">
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                            <input type="button" value="Upload" class="btn btn-custom blue-btn" onClick={this.onClickHandler}/>
                        </form>
                    </div>
                    <hr></hr>
                    <span className="row-info new-student">New student and don't have a transcript yet? </span>
                    <Link to="/career" onClick={this.props.newStudentHandler}>
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
