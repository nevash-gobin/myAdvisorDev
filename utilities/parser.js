const PDFParser = require("pdf2json"); //https://www.npmjs.com/package/pdf2json
const axios = require('axios');

/**
 * @description receives the location of a pdf file and returns a promise which resolves with the parsed json data 
 * @param {String} fileBuffer the file stored in memory 
 */
async function getPDFText(fileBuffer){
    let json = await new Promise((resolve, reject) => {
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

/**
 * @param {String} token - Replaces uri encoding in the string given eg %2B => +
 */
function decode(token){
    token = token.replace(/\%2B/g, '+');
    token = token.replace(/\%20/g, ' ');
    token = token.replace(/\%2F/g, '/');
    return token;
}

async function getCourses() {
    try {
      const {data:response} = await axios.get('http://localhost:5000/courses/all') //use data destructuring to get data from the promise object
      return response
    }

    catch (error) {
      console.log(error);
    }
  }

 /**
  * 
  * @param {*} text - data retrieved from parsing with pdfParser and flattening with getPDFText()
  * @param {*} filename - name of file
  */
async function getStudentData(text, filename){
    let inprogress = false;
    let courseCodeLetters = [];
    let courseCodeNumbers = [];
    var courses;
    var courseList = {};
    let totalCredits = 0;
    let student = {
        studentId:undefined,
        gpa:undefined,
        name: undefined,
        progress: undefined,
        credits: undefined,
        degree: undefined,
        major: undefined,
        admitTerm: undefined,
        parsedText: undefined
    }

    courses = await getCourses();

    let i = 0;

    for (i=0; i<courses.length; i++) {
        letterString = courses[i].courseCode.slice(0, 4)
        courseCodeLetters.push(letterString)

        numberString = courses[i].courseCode.slice(4, 8)
        courseCodeNumbers.push(numberString) 

        if (courseList[letterString]) {
            courseList[letterString].push(numberString)
        }
        else {
            courseList[letterString] = [numberString]
        }
       
    }

    i = 0;
    if(filename)
        student.filename = filename;

    i = 0;
    for(let token of text){

        if(token === "Record%20of%3A")
            student.name = decode(text[i-1])

        //reached the courses in progress section of transcript
        if(!inprogress && token === "In%20Progress%20Courses%3A"){
            inprogress = true;
        }

        if(token === "DEGREE%20GPA%20TOTALS"){
            student.gpa = text[i - 1]; 
        }

        if(token === "Record%20of%3A"){
            student.studentId = text[ i + 1]
        }

        if(token === "Admit%20Term%3A") {
            student.admitTerm = decode(text[i + 9])
            student.degree = decode(text[i + 12])
            student.major = decode(text[i + 16])
        }

        var j=0;
        for (key in courseList) {   
            if(courseList[key].includes(token) && text[i - 1] === key) {
            //grade column is 4 cols after the course column
            if(!inprogress){
                student[`${key}${token}`] = decode(text[i + 4]); //pull grade
                totalCredits += 3;
            }
            else
                student[`${key}${token}`] = 'IP'; //indicate In Progress
            }
        }
        i++;
    }
    student.credits = totalCredits;
    student.progress = ((totalCredits / 93) * 100).toFixed(1);
    student.parsedText = text;

    return student;
}

async function parse(file){
    const text = await getPDFText(file);
    const studentData = await getStudentData(text);
    return studentData;
    
}


module.exports = {parse}