

async function parseCSVData(csvData) {

    const headers = [];

    // course model
    let courseCodes = [];
    let courseTitles = [];
    let levels = [];
    let semesters = [];
    let credits = [];
    let descriptions = [];

    //programme model
    let programmeIds = [];
    let names = [];
    let faculty = [];
    let departments = [];

    // programmeCourse model
    //let types = [];
    let prerequisites = [];
    let antirequisites = [];

    const rows = csvData.split("\n");
    const row1 = rows[0].split(",");
    const row2 = rows[1].split(",");
    const row3 = rows[2].split(",");
    const row4 = rows[3].split(",");


    // Get all headers in the data
    headers.push(row1[0]);    // courseCode
    headers.push(row1[1]);    // courseTitle
    headers.push(row1[3]);    // level
    headers.push(row1[4]);    // semester
    headers.push(row1[5]);    // credits
    headers.push(row1[6]);    // prerequisites
    headers.push(row1[7]);    // antirequisites

    headers.push(row1[8]);    // programmeId
    headers.push(row2[8]);    // name
    headers.push(row3[8]);    // faculty
    headers.push(row4[8].trim());    // department

    // headers.push(row4[8]);    // department


    for (let i = 0; i < rows.length; i++) {
        //const row = rows[i].split(",");

        const regex = /("[^"]*")|([^,]+)|(,,)/g;
        const row = rows[i].match(regex).map(match => (match === ',,' ? '' : match.replace(/^"|"$/g, '').trim()));
//  console.log("rowTest", row);
//  console.log("row 0", row[0]);
//  console.log("row 1", row[1]);
//  console.log("row 2", row[2]);
//  console.log("row 3", row[3]);
//  console.log("row 4", row[4]);
//  console.log("row 5", row[5]);
//  console.log("row 6", row[6]);
//  console.log("row 7", row[7]);
//  console.log("row 8", row[8]);
//  console.log("row 9", row[9]);
//  console.log("row 10", row[10]);

        
        if (i === 0) {
            for (let j = 9; j < row.length; j++) {
                programmeIds.push(row[j]);
                //console.log("row 1", row[1]);
            }
        }
        if (i === 1) {
            for (let j = 5; j < row.length; j++) {
                names.push(row[j]);
            }
        }
        if (i === 2) {
            for (let j = 5; j < row.length; j++) {
                faculty.push(row[j]);
            }
        }
        if (i === 3) {
            for (let j = 5; j < row.length; j++) {
                departments.push(row[j]);
            }
        }
        if (i >= 4) {
            // Get course data
            courseCodes.push(row[0]);
            courseTitles.push(row[1]);
            levels.push(row[2]);
            semesters.push(row[3]);
            credits.push(row[4]);
            descriptions.push(row[5]);
            prerequisites.push(row[6]);
            antirequisites.push(row[7]);
        }


    }

    
    const compiledData = [
        { name: "programmeIds", data: programmeIds },     // 0
        { name: "names", data: names },                   // 1
        { name: "faculty", data: faculty },               // 2
        { name: "departments", data: departments },       // 3

        { name: "courseCodes", data: courseCodes },       // 4
        { name: "courseTitles", data: courseTitles },     // 5
        { name: "levels", data: levels },                 // 6
        { name: "semesters", data: semesters },           // 7
        { name: "credits", data: credits },               // 8
        { name: "descriptions", data: descriptions },     // 9
        { name: "prerequisites", data: prerequisites },   // 10
        { name: "antirequisites", data: antirequisites }, // 11
      ];
    //console.log("Compiled Data:", compiledData);
    
    // console.log("ProgrammeId:", programmeIds);
    // console.log("Names:", names);
    // console.log("Faculty:", faculty);
    // console.log("Deparment:", departments);
    
    // console.log("Course Code:", courseCodes);
    // console.log("Course Title:", courseTitles);
    // console.log("Levels:", levels);
    // console.log("Semesters:", semesters);
    // console.log("Credits:", credits);
    // console.log("Descriptions:", descriptions);
    
    // console.log("prerequisites: ", prerequisites);
    // console.log("antirequisites: ", antirequisites);
    
    
    return compiledData;
    
}

module.exports = { parseCSVData }
