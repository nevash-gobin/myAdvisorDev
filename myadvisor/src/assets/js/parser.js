let fs = require('fs'),
 PDFParser = require("pdf2json"); //https://www.npmjs.com/package/pdf2json

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
    return token;
}

 /**
  * 
  * @param {*} text - data retrieved from parsing with pdfParser and flattening with getPDFText()
  * @param {*} filename - name of file
  */
function getStudentData(text, filename){
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
            student.fullname = decode(text[i-1])

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
                student[`comp${token}`] = decode(text[i + 4]); //pull grade
                totalCredits += 3;
            }
            else
                student[`comp${token}`] = 'IP'; //indicate In Progress
        }

        if(infoCourses.includes(token) && text[i - 1]==='INFO'){
           
            if(!inprogress){
                student[`info${token}`] = decode(text[i + 4]); //pull grade
                totalCredits += 3;
            }
            else
                student[`info${token}`] = 'IP'; //indicate In Progress
        }
        
        if(miscCourses.includes(token) && text[i - 1] === 'FOUN'){
            if(!inprogress){
                student[`foun${token}`] = decode(text[i + 4]); //pull grade
                totalCredits += 3;
            }
            else
                student[`foun${token}`] = 'IP'; //indicate In Progress
        }

        if(miscCourses.includes(token) && text[i - 1] === 'MATH'){
            if(!inprogress){
                student[`math${token}`] = decode(text[i + 4]); //pull grade
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

async function parse(file){
    const text = await getPDFText(file);
    return getStudentData(text);
}


module.exports.parse = {parse}


