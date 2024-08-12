const PDFParser = require("pdf2json"); //https://www.npmjs.com/package/pdf2json
const Course = require('../models/Course')


/**
 * @description receives the location of a pdf file and returns a promise which resolves with the parsed json data 
 * @param {String} fileBuffer the file stored in memory 
 */
async function getPDFText(fileBuffer) {

    let json = await new Promise((resolve, reject) => {
        let pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataReady", pdfData => resolve(pdfData));
        pdfParser.on("pdfParser_dataError", errData => reject(errData));
        pdfParser.parseBuffer(fileBuffer);

    });

    let pdfText = [];
    // console.log("json  " + JSON.stringify(json['formImage']['Pages']));

    for (let page of json['Pages']) {
        //console.log("page    "+ page['Texts']);
        for (let text of page['Texts']) {
            //console.log("*******Text    "+text['R']);
            for (let rec of text['R']) {

                let token = rec['T'];
                //console.log("token    " + token);
                pdfText.push(token)
            }
        }
    }
    return pdfText;
}

/**
 * @param {String} token - Replaces uri encoding in the string given eg %2B => +
 */
function decode(token) {
    token = token.replace(/\%2B/g, '+');
    token = token.replace(/\%20/g, ' ');
    token = token.replace(/\%2F/g, '/');
    token = token.replace(/\%2C/g, ',');
    return token;
}

async function getCourses() {
    try {
        return await Course.findAll();
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
async function getStudentData(text) {
    let inprogress = false;
    let courseCodeLetters = [];
    let courseCodeNumbers = [];
    let terms = [];
    let noCreditGrade = ["F1", "F2", "F3", "DIS", "EI", "FA", "FAS", "FC", "FE", "FO", "FP", "FT", "FWS", "FTS", "AB", "AM", "AMS", "DB", "DEF", "EQ", "EX", "FM", "FMS", "FWR", "I", "IP", "LW", "NCR", "NFC", "NP", "NR", "NV", "W", "FMP"]
    //var courses;
    let studentCourseList = []
    var courseList = {};
    let totalCredits = 0;
    let period = undefined;
    let student = {
        studentId: undefined,
        degreeGpa: undefined,
        name: undefined,
        progress: undefined,
        credits: undefined,
        degree: undefined,
        major: undefined,
        admitTerm: undefined,
        cumulativeGpa: undefined,
        degreeAttemptHours: undefined,
        degreePassedHours: undefined,
        degreeEarnedHours: undefined,
        degreeGpaHours: undefined,
        degreeQualityPoints: undefined,
        studentCourses : studentCourseList

    }

    const courses = await getCourses();
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", courses);
    let i = 0;

    for (i = 0; i < courses.length; i++) {
        letterString = courses[i].code.slice(0, 4)
        courseCodeLetters.push(letterString)

        numberString = courses[i].code.slice(4, 8)
        courseCodeNumbers.push(numberString)

        if (courseList[letterString]) {
            courseList[letterString].push(numberString)
        }
        else {
            courseList[letterString] = [numberString]
        }

    }

    i = 0;
  

    i = 0;
    for (let token of text) {

        if (token === "Record%20of%3A") {
            student.name = decode(text[i - 1])
            console.log("text      " + text[i - 1]);
            //console.log("i    " + i);
        }
        
        if (token === "Academic%20Standing%3A"){
            period = decode(text[i+1]);
        }
        //reached the courses in progress section of transcript
        if (!inprogress && token === "In%20Progress%20Courses%3A") {
            inprogress = true;
        }

        if (token === "DEGREE%20GPA%20TOTALS") {
            student.degreeGpa = text[i - 1];
            student.degreeAttemptHours = text[i + 12];
            student.degreePassedHours = text[i + 13];
            student.degreeEarnedHours = text[i + 14];
            student.degreeGpaHours = text[i + 15];
            student.degreeQualityPoints = text[i + 16];
            // student.degreeGpa = text[i + 17];
        }

        if (token === "Record%20of%3A") {
            student.studentId = text[i + 1]
        }

        if (token === "Admit%20Term%3A") {
            student.admitTerm = decode(text[i + 9])
            student.degree = decode(text[i + 12])
            student.major = decode(text[i + 16])
        }

        var j = 0;
        //Where courses done and doing is extracted
        for (key in courseList) {
            if (courseList[key].includes(token) && text[i - 1] === key) {
                //grade column is 4 cols after the course column
                let grade = undefined;
                if (!inprogress) {
                    grade = decode(text[i + 4]);
                    var title = decode(text[i + 5])
                    // student[`${key}${token}`] = [title, grade]; <- OLD WAY
                    if (!noCreditGrade.includes(grade)) {
                        totalCredits += parseInt(text[i + 2], 10);
                    }
                }
                else {
                    var title = decode(text[i + 3])
                    grade = 'IP'
                    // student[`${key}${token}`] = [title, grade]; //indicate In Progress <- OLD WAY
                }
                let course= `${key}${token}`;
                let academicperiod = period.split(" ")
                let courseInfo = {
                    "title":title, 
                    "grade":grade,
                    "semester": academicperiod[2]==='I' ? 1 : 2,
                    "year": academicperiod[0]
                };

                student.studentCourses.push({[course]:courseInfo});
                // console.log(academicperiod);

            }
        }
        if (token === 'Overall%3A'){
            student.cumulativeGpa = decode(text[i+17])
        }
        i++;
    }
    student.credits = totalCredits;
    student.progress = ((totalCredits / 93) * 100).toFixed(1);
    // student.parsedText = text;

    //console.log("Student data 1", student);

    return student;
}
//feed path to student pdf -> extracts the text of the pdf -> feeds text to getStudentData -> returns JSON object
async function parse(file) {
    const text = await getPDFText(file);
    // console.log("=================================================pdftext - " + text);
    var studentData = await getStudentData(text);
    //console.log("Student data " + studentData.COMP3609);
    return studentData;

}


async function getAcademicHistory(file) {
    const student_history = await parse(file);
    const student_name = student_history.name;
    const student_id = student_history.studentId;
    const date = new Date().toLocaleString();
    const cumulative_gpa = student_history.cumulativeGpa;
    const degree_gpa = student_history.degreeGpa;
    const courses = student_history.studentCourses.map(c=> {
        const course = Object.keys(c)[0];
        return {
            grade: c[course].grade,
            studentId : student_id,
            semester: c[course].semester,
            year: c[course].year,
            code: course

        }
    });

    return {
        name: student_name,
        id: student_id ,
        date_printed :date,
        degree_gpa : degree_gpa,
        cumulative_gpa : cumulative_gpa,
        history : courses
    }
}

module.exports = { parse, getAcademicHistory}