const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");
const SelectedCourse = require("../models/SelectedCourse");
const Programme = require("../models/Programme");
const Semester = require("../models/Semester");
const { Op } = require('sequelize');
async function getAllCoursePlans(semesterId){
    
    try{
        semesterId = parseInt(semesterId);
        //pending courses 
        const courseplans = await AdvisingSession.findAll({
            attributes:['id','planStatus','studentId','semesterId'],
            where: {
                [Op.and] : [
                    {planStatus:'Pending'},
                    {semesterId: semesterId}
                ]
            }
        }).then(plans => plans.map(async (info) => {
            const student = info.get('studentId');
            const semester = info.get('semesterId');
            const planId = info.get('id');
            const status = info.get('planStatus')
            const student_info = await Student.findOne({
                attributes:['programmeId','firstName','lastName'],
                where :{
                    studentId: student
                }
            }).then(async (student) =>{
                return [
                    student.get('firstName'),
                    student.get('lastName'),
                    await Programme.findOne({
                        attributes:['name'],
                        where:{id: student.get('programmeId')}
                    }).then(prog=>{
                        return prog.get('name');
                    })
                ]
            });
            const courses = await SelectedCourse.findAll({
                attributes :['courseCode'],
                where : {
                    AdvisingSessionId: planId
                }
            }).then(courses => courses.map(course => {
                return course.get('courseCode');
            }));
            return {
                studentId:student,
                firstName: student_info[0],
                lastName: student_info[1],
                programmeName: student_info[2],
                semesterId:semester,
                status:status,
                courses: courses
            }
        })); 
        return Promise.all(courseplans); 
    }catch(error){
        const msg = `Error in getting all student courseplans for semesterId ${semesterId}:`;
        console.log(msg,error.message);
        return null;

    }
}
// (async () => {
//     console.log(await getAllCoursePlans(2));
// })()
module.exports = {getAllCoursePlans}