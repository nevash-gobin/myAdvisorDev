
const SelectedCourse = require('../models/SelectedCourse');
const AdvisingSession = require('../models/AdvisingSession');
// const programmeCourse = require('../models/AdvisingSession');

async function getPlannedCourses(studentId, semesterId){


    let advisingSession = await AdvisingSession.findOne({where: { studentId: studentId, semesterId: semesterId }})
    // console.log("Advising Session: ",advisingSession);
    if(advisingSession){
        let advisingSessionId = advisingSession.dataValues.id;
        // console.log("advisingSessionId: ", advisingSessionId);
        let SelectedCourses = await SelectedCourse.findAll({where: {advisingSessionId}});
        // console.log(SelectedCourses);
        let SelectedCourseCodes = [];
        for( let SelectedCourse of SelectedCourses){
            // console.log(SelectedCourse);
            SelectedCourseCodes.push(SelectedCourse.dataValues.courseCode);
        }
        // console.log("SelectedCourseCodes: ", SelectedCourseCodes);
        return SelectedCourseCodes;
    }


}

module.exports = { getPlannedCourses };


