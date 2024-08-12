const Antirequisite = require("../models/Antirequisite");
const Prerequisite = require("../models/Prerequisite");
const CourseGroup = require("../models/CourseGroup");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const StudentCourse = require("../models/StudentCourse");
const SemesterCourse = require("../models/SemesterCourse");
const Student = require("../models/Student");
const { Op } = require("sequelize");

async function get_prereq_courses(undone_course, student_programme_id){
    const prereqs = await Prerequisite.findAll({
        attributes : ['groupId'],
        where:{
            ProgrammeId : student_programme_id,
            courseCode: undone_course
        }
    });
    const groups = prereqs.map(pc => pc.get('groupId'));
    const prereqs_list = await Promise.all(groups.map(async (group) => {
        // if (group!==''){
            const el_course = await CourseGroup.findAll({
                attributes : ['courseCode'],
                where:{
                    groupId:group
                }
            });
            return el_course.map(ec => ec.get('courseCode'));
        // }
    }));
    return prereqs_list;
    
}
function logical_and_prereq_handler(prereq_courses, student_courses){
    for (let c of prereq_courses){
        if(!student_courses.includes(c)){
            return false;
        }
    }
    return true;
}

function logical_or_prereq_handler(prereq_courses, student_courses){
    prereq_courses = prereq_courses.length<2 ? prereq_courses[0] : prereq_courses;
    for (let c of prereq_courses){
        if(student_courses.includes(c)){
            return true;
        }
    }
    return false;
}

async function getEligibleCourses (student_id,coming_semester){
    try{
        const programme_id = await Student.findOne({
            attributes : ['programmeId'],
            where :{
                studentId : student_id
            }
        }).then( async (programme)=>{
            return programme.get('programmeId');
        });
        const programme_courses = await ProgrammeCourse.findAll({
            attributes : ['courseCode'],
            where: {
                ProgrammeId : programme_id
            }
        });
        const student_courses = await StudentCourse.findAll({
            attributes : ['courseCode'],
            where: {
                studentId : student_id
            }
        }).then(async (std_courses) =>{
            return std_courses.map(std => std.get('courseCode'));
        });
        const courses = programme_courses.map(c => c.get('courseCode'));//do not use beyond undone
        //const undone = courses.filter(course => !student_courses.includes(course));//Courses within student programme they could do
        const semseter_courses = await SemesterCourse.findAll({
            attributes : ['courseCode'],
            where :{
                semesterId : coming_semester
            }
        }).then(async (courses)=>{
            return courses.map(c => c.get('courseCode'));
        });
        const undone = courses.filter(course => !student_courses.includes(course));//Courses within student programme they could do
        const undone_within_semester = undone.filter(course => semseter_courses.includes(course));
        const courses_eligible = undone_within_semester.map(uc => {
            const course = get_prereq_courses(uc,programme_id).then(
                (value)=>{
                    var courses_e = [];
                    value = value.length>1 ? value[0].concat(value[1]) : value;
                    if (value.length==0){
                        courses_e.push(uc);
                    }else if (value.length>2 && value.length!== new Set(value).size){
                        value = [...new Set(value)]
                        courses_e = logical_and_prereq_handler(value,student_courses) ? courses_e.concat(uc) : courses_e
                    }else{
                        courses_e = logical_or_prereq_handler(value,student_courses) ? courses_e.concat(uc) : courses_e
                    }
                    return courses_e
                });
                const final_eligible = course.then(async (result) => {
                    let initial_eligible = result;
    
                    const anti = await Antirequisite.findOne({
                        attributes: ['courseCode','antirequisiteCourseCode'],
                        where: {
                            [Op.or]:[
                                {courseCode : uc},
                                {antirequisiteCourseCode : uc}
                            ]  
                        }
                    });
                    if (anti!==null){
                        const course = anti.get('courseCode');
                        const counter = anti.get('antirequisiteCourseCode');
                        if (initial_eligible.includes(course) && initial_eligible.indexOf(counter)> -1){
                            initial_eligible.splice(initial_eligible.indexOf(counter),1);
                        }else if (initial_eligible.includes(counter) && initial_eligible.indexOf(course)> -1){
                            initial_eligible.splice(initial_eligible.indexOf(course),1);
                        }
                    }
                    return initial_eligible;
                });
                return final_eligible;
        });
        let eligible_list = await Promise.all(courses);
        eligible_list = eligible_list.filter((c)=>c!==undefined && c.length>0);
        return [].concat(...eligible_list);
    }catch(error){
        const msg = `Error in getting student's ${studentId} eligible courses for coming Semester: `;
        console.log(msg, error.message);
        return null;
    }
    
}

// testing without Postman

// (async () =>{
//     const dummyStudentCourses_db = await StudentCourse.findAll({
//         attributes : ['courseCode'],
//         where: {
//             studentId : '816031565'
//         }
//     });
//     const dummyStudentCourses = [
//         'COMP1600',
//         'COMP1601',
//         'INFO1600',
//         'MATH1115',
//         'FOUN1101'
//     ]
//     const test_e = await getEligibleCourses('816031565',2);
//     console.log(test_e);
// })()
/**
 * Expected
 * 'COMP1602',
 * 'COMP1603',
 * 'COMP1604',
 * 'FOUN1105',
 * 'INFO1601'
 */
module.exports = { getEligibleCourses };

