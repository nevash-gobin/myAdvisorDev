import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import axios from 'axios';

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
        formdata.append("file", this.state.file, "[PROXY]");
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/transcript/parseForm", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(this.props.uploadedHandler())
          .catch(error => console.log('error', error));
	}

  render() {
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <p className="row-info">No transcript has been uploaded, please upload your unofficial transcript to get started with advising.</p>
                        <div class="input-field col s4">
                        <form action="" enctype="multipart/form-data" method="POST">
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                            <input type="button" value="Upload" class="btn btn-custom blue-btn" onClick={this.onClickHandler}/>
                        </form>
                        </div>
    
                </div>
            </div>
      </div>
    );
  }
}

export default NoTranscript;
