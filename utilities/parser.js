const PDFParser = require("pdf2json"); //https://www.npmjs.com/package/pdf2json

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
    let courses = ["2605", "2606", "2611"];
    let student = {
        id:undefined,
        gpa:undefined,
        fullname: undefined,
        comp2606:'N/A',
        info2602:'N/A',
        comp2611:'N/A',
        comp2605:'N/A',
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
        if(courses.includes(token)){
            // console.log(token, decode(text[i + 4]));
            //grade column is 4 cols after the course column
            if(!inprogress)
                student[`comp${token}`] = decode(text[i + 4]); //pull grade
            else
                student[`comp${token}`] = 'IP'; //indicate In Progress
        }

        if(token === '2602' && text[i - 1]==='INFO'){
           
            if(!inprogress)
                student[`info${token}`] = decode(text[i + 4]); //pull grade
            else
                student[`info${token}`] = 'IP'; //indicate In Progress
        }
            
        i++;
    }

    student.parsedText = text;

    return student;
}

async function parse(file){
    const text = await getPDFText(file);
    return getStudentData(text);
}


module.exports = {parse}


