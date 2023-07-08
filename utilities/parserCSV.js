

const fs = require('fs');
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const { log } = require('console');


// Read CSV file and copy contents to a 2D array
async function readCSV(data) {

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

    const lines = data.split('\n');
    const numLines = lines.length;
    //console.log("lines: ", lines[0]);
    //console.log("numLines: ", numLines);


    for (let i = 0; i < numLines; i++) {    //for each line in the data
        values = lines[i].split(",");
        //console.log("value: ", values);

        // Programme data
        if (i == 0) {  
            for (let j = 9; j < values.length; j++) {
                programmeIds.push(values[j]);
            }
        }
        if (i == 1) { //second line
            for (let j = 9; j < values.length; j++) {
                names.push(values[j]);
            }
        }
        if (i == 2) { //third line
            for (let j = 9; j < values.length; j++) {
                faculty.push(values[j]);
            }
        }
        if (i == 3) { /// fourth line
            for (let j = 9; j < values.length; j++) {
                departments.push(values[j]);
            }
        }

        // Course data
        if (i > 4) {
            // Get course data
            courseCodes.push(values[0]);
            courseTitles.push(values[1]);
            levels.push(values[2]);
            semesters.push(values[3]);
            credits.push(values[4]);
            descriptions.push(values[5]);
            prerequisites.push(values[6]);
            antirequisites.push(values[7]);

        }

    }

   

    // console.log("ProgrammeId:", programmeIds);
    // console.log("Names:", names);
    // console.log("Faculty:", faculty);
    // console.log("Deparment:", departments);

    // create programme entry
    for (let i = 0; i < programmeIds.length; i++) {
        const programme = await Programme.findOne({ where: { id: programmeIds[i] } });
        if (!programme) {

            await Programme.create({
                id: programmeIds[i],
                name: names[i],
                faculty: faculty[i],
                department: departments[i],
            })
                .then(() => {
                    //console.log("Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });


        }
    }


    // console.log("Course Code:", courseCodes);
    // console.log("Course Title:", courseTitles);
    // console.log("Levels:", levels);
    // console.log("Semesters:", semesters);
    // console.log("Credits:", credits);
    // console.log("Descriptions:", descriptions);

    // create Course entries
    for (let i = 0; i < courseCodes.length; i++) {
        const course = await Course.findOne({ where: { courseCode: courseCodes[i] } });
        if (!course) {

            await Course.create({
                courseCode: courseCodes[i],
                courseTitle: courseTitles[i],
                level: levels[i],
                semester: semesters[i],
                credits: credits[i],
                description: descriptions[i],

            })
                .then(() => {
                    //console.log("Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }
    }

    
    // create programmeCourse/ prerequisites/ anitrequisites entries
    for(let i=4; i<numLines; i++){
        
        values = lines[i].split(",");
        //create programmecourse
        console.log("Line: ", values);
        console.log("Length: ", values.length);

        let count= 0;

        //create programmeCourse entries
        for (let j = 9; j < values.length; j++) {
            
            console.log("courseCode: ", values[0]);
            console.log("progId: ", programmeIds[count]);
            console.log("typeID: ", values[j]);
           
            const programmeCourse = await ProgrammeCourse.findOne({
                where: {
                  courseCode: values[0],
                  programmeId: programmeIds[count]
                }
              });
              
            //console.log("programmeCourse: ", programmeCourse);
            if (!programmeCourse) {
                // console.log("creating the programmeCourses");
                await ProgrammeCourse.create({
                    programmeId: programmeIds[count],
                    courseCode: values[0],
                    typeId: values[j],
                })
                    .then(() => {
                        // console.log("Created!");
                        
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });


            }
            count++;
            
        }

        //for( let k = 4; k< values.length; k++ ){}
            // console.log("courseCode: ", values[0]);
            // console.log("prerequisites: ", values[6]);
            // console.log("antirequisites: ", values[7]);
        







    }

    

}



module.exports = { readCSV }