const AdvisingSession = require("../models/AdvisingSession");
const Student = require("../models/Student");
const SelectedCourse = require("../models/SelectedCourse")
const { getCoursePlan } = require("./getCoursePlan");
const { Op, where } = require('sequelize');
async function getStudentCoursePlan(studentId,semesterId){
    try{
        const advising_info = await AdvisingSession.findOne({
            attributes: ['planStatus', 'updatedAt'],
            where: {
                [Op.and] : [
                    {studentId: studentId},
                    {semesterId:semesterId}
                ]
                
            }
        });

        const plan = await getCoursePlan(studentId, semesterId);

        const current_date = new Date();
        const year = current_date.getFullYear();
        const month = String(current_date.getMonth() + 1).padStart(2, '0');
        const day = String(current_date.getDate()).padStart(2, '0');
        let last_update = `${year}-${month}-${day}`;
        let status = "New";
        if(advising_info){
            last_update = advising_info.get('updatedAt');
            status = advising_info.get('planStatus');
        }
        return {
            [studentId]: {
                lastUpdated: last_update,
                status: status,
                plan: plan,
                limit: 15
            }
        }
    } catch (error) {
        const msg = `Error in getting student's ${studentId} structured courseplan for semesterId ${semesterId}:`;
        console.log(msg, {...error});
        return null;
    }
}
//Pretty Redundant
async function getStudentCoursePlanSimple(studentId,semesterId){
    try{
        const courseplan = await AdvisingSession.findOne({
            attributes: ['studentId','planStatus','id'],
            where: {
                [Op.and] :[
                    {studentId:studentId},
                    {semesterId:semesterId}
                ]
            }
        }).then(async (plan)=>{
            const current_year = new Date().getFullYear();
            const year = current_year - await Student.findOne({
                attributes:['year'],
                where :{
                    studentId: studentId
                }
            }).then(async(stu)=>{
                return stu.get('year');
            });
            if(!plan){
                let status = "New";
                return{
                    year:year,
                    status: status,
                    courses:[]
                }
            }
            const stat = plan.get('planStatus');
            const planId = plan.get('id');
            const courses = await SelectedCourse.findAll({
                attributes :['courseCode'],
                where : {
                    AdvisingSessionId: planId
                }
            }).then(courses => courses.map(course => {
                return course.get('courseCode');
            }));
            return{
                year:year,
                status:stat,
                courses:courses
            }
        });
        return courseplan;
    }catch(error){
        const msg = `Error in getting student's ${studentId} simple courseplan for semesterId ${semesterId}:`;
        console.log(msg,error.message);
        return null;
    }
}
module.exports = { getStudentCoursePlan, getStudentCoursePlanSimple }