import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import * as fs from 'fs'

class NoTranscript extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.getPDFText = this.getPDFText.bind(this);
        this.decode = this.decode.bind(this);
        this.getStudentData = this.getStudentData.bind(this);
        this.parse = this.parse.bind(this);
      }

    handleFiles = files => {
        console.log(files)
        this.parse(files[0])
    }

    async getPDFText(fileBuffer){
        let json = await new Promise((resolve, reject) => {
            let fs = require('fs'),
            PDFParser = require("pdf2json");
            let pdfParser = new PDFParser();
            pdfParser.on("pdfParser_dataReady", pdfData => resolve(pdfData));
            pdfParser.on("pdfParser_dataError", errData => reject(errData));
            pdfParser.parseBuffer(fileBuffer);
        });
        
        let pdfText = [];
    
        for(let page of json['formImage']['Pages']){
            for(let text of page['Texts']){
                for(let rec of text['R']){
                    let token = rec['T'];
                    pdfText.push(token)
                }
            }
        }
        return pdfText;
    }
    
    decode(token){
        token = token.replace(/\%2B/g, '+');
        token = token.replace(/\%20/g, ' ');
        return token;
    }
    
    getStudentData(text, filename){
        let inprogress = false;
        let compCourses = ["1600", "1601", "1602", "1603", "1604", "2601", "2602", "2603", "2604", "2605", "2606", "2611", "3601", "3602", "3605", "3603", "3613"];
        let infoCourses = ["1600", "1601", "2602", "2604", "3600", "3604"];
        let miscCourses = ["1115", "1101", "1105", "1301", "2250"];
        let totalCredits = 0;
        let student = {
            id:undefined,
            gpa:undefined,
            fullname: undefined,
            progress: undefined,
            credits: undefined,
            comp1600:'N/A',
            comp1601:'N/A',
            info1600:'N/A',
            math1115:'N/A',
            foun1101:'N/A',
    
            comp1602:'N/A',
            comp1603:'N/A',
            comp1604:'N/A',
            info1601:'N/A',
            foun1105:'N/A',
    
            comp2601:'N/A',
            comp2602:'N/A',
            comp2605:'N/A',
            comp2611:'N/A',
            math2250:'N/A',
    
            comp2603:'N/A',
            comp2604:'N/A',
            comp2606:'N/A',
            info2602:'N/A',
            info2604:'N/A',
    
            
            comp3602:'N/A',
            comp3603:'N/A',
            comp3605:'N/A',
            comp3613:'N/A',
            info3600:'N/A',
            
            comp3601:'N/A',
            info3604:'N/A',
            foun1301:'N/A',
            parsedText: undefined
        }
    
        if(filename)
            student.filename = filename;
    
        let i = 0;
        for(let token of text){
    
            if(token === "Record%20of%3A")
                student.fullname = this.decode(text[i-1])
    
            //reached the courses in progress section of transcript
            if(!inprogress && token === "In%20Progress%20Courses%3A"){
                inprogress = true;
            }
    
            if(token === "DEGREE%20GPA%20TOTALS"){
                student.gpa = text[i - 1]; 
            }
    
            if(token === "Record%20of%3A"){
                student.id = text[ i + 1]
            }
    
            //we want the grades of 4 specific courses
            if(compCourses.includes(token) && text[i - 1] === 'COMP'){
                // console.log(token, decode(text[i + 4]));
                //grade column is 4 cols after the course column
                if(!inprogress){
                    student[`comp${token}`] = this.decode(text[i + 4]); //pull grade
                    totalCredits += 3;
                }
                else
                    student[`comp${token}`] = 'IP'; //indicate In Progress
            }
    
            if(infoCourses.includes(token) && text[i - 1]==='INFO'){
               
                if(!inprogress){
                    student[`info${token}`] = this.decode(text[i + 4]); //pull grade
                    totalCredits += 3;
                }
                else
                    student[`info${token}`] = 'IP'; //indicate In Progress
            }
            
            if(miscCourses.includes(token) && text[i - 1] === 'FOUN'){
                if(!inprogress){
                    student[`foun${token}`] = this.decode(text[i + 4]); //pull grade
                    totalCredits += 3;
                }
                else
                    student[`foun${token}`] = 'IP'; //indicate In Progress
            }
    
            if(miscCourses.includes(token) && text[i - 1] === 'MATH'){
                if(!inprogress){
                    student[`math${token}`] = this.decode(text[i + 4]); //pull grade
                    totalCredits += 3;
                }
                else
                    student[`math${token}`] = 'IP'; //indicate In Progress
            }
            i++;
        }
        student.credits = totalCredits;
        student.progress = ((totalCredits / 93) * 100).toFixed(1);
        student.parsedText = text;
    
        return student;
    }
    
    async parse(file){
        const text = await this.getPDFText(file);
        return this.getStudentData(text);
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
