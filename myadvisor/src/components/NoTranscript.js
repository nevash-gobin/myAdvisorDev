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

    async parseTranscript(file) {
        axios.post('/parse', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

     onChangeHandler = event =>{
        this.setState({
            file: event.target.files[0]
        })
    }

    onClickHandler = () => {
        console.log("Yo")
        var formdata = new FormData();
        formdata.append("file", this.state.file, "[PROXY]");
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/parseForm", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
	}

    updateData = async () => {
        try {
            const formData = new FormData();
            console.log("booling")
            console.log(this.state.file)
            formData.append('file', this.state.file);

            const response = await axios.post("http://localhost:5000/parseForm", {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(json => console.log(json));
            console.warn(response.data);
        } catch (error) {
            console.warn(error);
        }
    };
    

    testFunc = () => {
        console.log(this.state.data)
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
                            <input type="button" value="upload" class="btn btn-success btn-block" onClick={this.onClickHandler}/>
                            <button type="button" class="btn btn-success btn-block" onClick={this.testFunc}>Check</button>
                            <button class="btn waves-effect waves-light blue" type="submit" name="action">Submit</button>
                        </form>
                        </div>
    
                </div>
            </div>
      </div>
    );
  }
}

export default NoTranscript;
