const db = require("../db");

// const ProgrammesJSON = require("../programmes.json");
// const CoursesJSON = require("../courses.json");
const TypesJSON = require("../types.json");
const Type = require("../models/Type");

// models
// const Admin = require("../models/Admin");
// const AdvisedCourse = require("../models/SelectedCourse");
// const AdvisingSesssion = require("../models/AdvisingSession")
// const Antirequisite = require("../models/Antirequisite");
// const AwardedDegree = require("../models/AwardedDegree");
// const ElectiveRequirement = require("../models/ElectiveRequirement");
// const PotentialGraduate = require("../models/PotentialGraduate");
// const Prerequisite = require("../models/Prerequisite");
// const Semester = require("../models/Semester");
// const Student = require("../models/Student");
// const StudentCourse = require("../models/StudentCourse");
// const Transcript = require("../models/Transcript");
// const Group = require("../models/Group");
// const CourseGroup = require("../models/CourseGroup");
// const SemesterCourse = require("../models/SemesterCourse");


async function createType({type, description}){
    return Type.create({type, description});
}

// async function createCourse({code, title, faculty, credits, level, semester, department, description}) {

//    return Course.create({code, title, faculty, credits, level, semester, department, description});
//     // // Create Prerequisites
//     // if (courseData.prerequisites) {
//     //     const prerequisites = courseData.prerequisites.split(' OR ');
//     //     for (const prereqCode of prerequisites) {
//     //         const prereq = await Prerequisite.create({
//     //             courseCode: newCourse.courseCode,
//     //             prerequisiteCourseCode: prereqCode,
//     //         });
//     //         console.log(`Prerequisite created for ${newCourse.courseCode}: ${prereq.prerequisiteCourseCode}`);
//     //     }
//     // }

//     // // Create Antirequisites
//     // if (courseData.antirequisites) {
//     //     const antirequisites = courseData.antirequisites.split(' OR ');
//     //     for (const antireqCode of antirequisites) {
//     //         const antireq = await Antirequisite.create({
//     //             courseCode: newCourse.courseCode,
//     //             antirequisiteCourseCode: antireqCode,
//     //         });
//     //         console.log(`Antirequisite created for ${newCourse.courseCode}: ${antireq.antirequisiteCourseCode}`);
//     //     }
//     // }
// }


// async function createProgramme({name, courses, faculty, department, requirements, version}) {
//     let new_prog = await Programme.create({ name, faculty, department, version });

//     let promises = [];
//     for (let [code, type] of Object.entries(courses)){
//         promises.push(
//             ProgrammeCourse.create({
//                 programmeId: new_prog.id,
//                 courseId: code,
//                 typeId: type
//             })
//         );
//     }

//     return Promise.all(promises);
// }

// async function loadProgrammes(ProgrammesJSON){
//     let promises = ProgrammesJSON.map( createProgramme );
//     try{
//         await Promise.all(promises);
//     }catch(e){
//         console.error("Error: ", e);
//     }    
// }

// async function loadCourses(CoursesJSON){
//     let promises = CoursesJSON.map( createCourse );
//     try{
//         await Promise.all(promises);
//     }catch(e){
//         console.error("Error: ", e);
//     }    
// }

async function loadTypes(TypesJSON){
    let promises = TypesJSON.map( createType );
    try{
        await Promise.all(promises);
    }catch(e){
        console.error("Error: ", e);
    }    
}

(async ()=>{
    await db.sync({force:true});
    await loadTypes(TypesJSON);
    // await loadCourses(CoursesJSON);
    // await loadProgrammes(ProgrammesJSON);
    console.log('Done')
    
})()
