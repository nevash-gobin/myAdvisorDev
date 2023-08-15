
const AdvisedCourse = require('../models/AdvisedCourse');
const AdvisingSession = require('../models/AdvisingSession');
// const programmeCourse = require('../models/AdvisingSession');

async function getPlannedCourses(studentId, semesterId){


    let advisingSession = await AdvisingSession.findOne({where: { studentId: studentId, semesterId: semesterId }})
    // console.log("Advising Session: ",advisingSession);
    if(advisingSession){
        let advisingSessionId = advisingSession.dataValues.id;
        // console.log("advisingSessionId: ", advisingSessionId);
        let advisedCourses = await AdvisedCourse.findAll({where: {advisingSessionId}});
        // console.log(advisedCourses);
        let advisedCourseCodes = [];
        for( let advisedCourse of advisedCourses){
            // console.log(advisedCourse);
            advisedCourseCodes.push(advisedCourse.dataValues.courseCode);
        }
        // console.log("advisedCourseCodes: ", advisedCourseCodes);
        return advisedCourseCodes;
    }


}

module.exports = { getPlannedCourses };


