import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import { parse } from '../assets/js/parser';
  

class NoTranscript extends Component {
    handleFiles = files => {
        console.log(files)
        console.log({parse}(files[0]))
    }
      
  render() {
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <p className="row-info">No transcript has been uploaded, please upload your unofficial transcript to get started with advising.</p>
                    <ReactFileReader fileTypes={[".pdf"]} handleFiles={this.handleFiles}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>
                </div>
            </div>
      </div>
    );
  }
}

export default NoTranscript;
