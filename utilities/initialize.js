const db = require("../db");
const bcrypt = require("bcrypt");
// Dummy Data
const ProgrammesJSON = require("../dummy_files/programmes.json");
const CoursesJSON = require("../dummy_files/courses.json");
const TypesJSON = require("../dummy_files/types.json");
const StudentsJSON = require("../dummy_files/students.json");
const SemestersJSON = require("../dummy_files/semesters.json");
const StudentCoursesJSON = require("../dummy_files/studentCourses.json");
// const Dummytranscript = require("./dummytranscript.json")
// const DummyProgCourses = require("./dummyProgCourses.json")
const AdvisingSessionsJSON = require("../dummy_files/advisingSessions.json");
const SelectedCourseJSON = require("../dummy_files/selectedCourses.json")

// models
// const Admin = require("../models/Admin");
const SelectedCourse = require("../models/SelectedCourse");
const AdvisingSession = require("../models/AdvisingSession");
const Antirequisite = require("../models/Antirequisite");
// const AwardedDegree = require("../models/AwardedDegree");
const ElectiveRequirement = require("../models/ElectiveRequirement");
// const PotentialGraduate = require("../models/PotentialGraduate");
const Prerequisite = require("../models/Prerequisite");
const Semester = require("../models/Semester");
const Student = require("../models/Student");
const StudentCourse = require("../models/StudentCourse");
// const Transcript = require("../models/Transcript");
const Group = require("../models/Group");
const CourseGroup = require("../models/CourseGroup");
const SemesterCourse = require("../models/SemesterCourse");
const Type = require("../models/Type");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");
require("../models/Associations");

async function createType({ type, description }) {
    return Type.create({ type, description });
}

async function createProgramme(programmeData) {
    return Programme.create(programmeData);
}

async function loadProgrammes(programmesJSON) {
    let promises = programmesJSON.map(createProgramme);
    try {
        await Promise.all(promises);
        console.log("Loaded Programmes");
    } catch (e) {
        console.error("Error loading programmes: ", e);
    }
}


async function createCourse(courseData) {
    return Course.create(courseData);
}

async function loadCourses(coursesJSON) {
    let promises = coursesJSON.map(createCourse);
    try {
        await Promise.all(promises);
        console.log("Loaded Courses");
    } catch (e) {
        console.error("Error loading courses: ", e);
    }
}

async function loadTypes(TypesJSON) {
    let promises = TypesJSON.map(createType);
    try {
        await Promise.all(promises);
        console.log('Loaded Types');
    } catch (e) {
        console.error("Error: ", e);
    }
}

async function createProgrammeCourse(programmeId, courseCode, typeId) {
    return ProgrammeCourse.create({ programmeId, courseCode, typeId });
}

async function loadProgrammeCourses(programmesJSON) {
    let promises = programmesJSON.map(async (programmeData) => {
        const programme = await Programme.findOne({ where: { name: programmeData.name } });
        const courseIdArray = Object.keys(programmeData.courses);

        const coursePromises = courseIdArray.map(async (courseCode) => {
            const course = await Course.findOne({ where: { code: courseCode } });;
            const typeName = await Type.findOne({
                where: {
                    type: programmeData.courses[courseCode]
                }
            });
            const typeId = await Type.findOne({
                where: {
                    type: typeName.type
                }
            });

            return createProgrammeCourse(programme.id, course.code, typeId.id);

        });

        return Promise.all(coursePromises);
    });

    try {
        await Promise.all(promises);
        console.log('Loaded Programme Courses');
    } catch (e) {
        console.error("Error loading programme courses: ", e);
    }
}


async function createElectiveRequirement(amount, programmeId, typeId) {
    return ElectiveRequirement.create({ amount, programmeId, typeId });
}

async function loadElectiveRequirements(programmesJSON) {
    let promises = programmesJSON.map(async (programmeData) => {
        const programme = await Programme.findOne({ where: { name: programmeData.name } });
        const reqIdArray = Object.keys(programmeData.requirements);

        const reqPromises = reqIdArray.map(async (type_n) => {
            const amt = programmeData.requirements[type_n];
            const typeId = await Type.findOne({
                where: {
                    type: type_n
                }
            });

            return createElectiveRequirement(amt, programme.id, typeId.id);

        });

        return Promise.all(reqPromises);
    });

    try {
        await Promise.all(promises);
        console.log('Loaded Elective Requirements');
    } catch (e) {
        console.error("Error loading Elective Requirements: ", e);
    }
}


//Dummy data loading
async function createStudent(studentData) {
    return Student.create(studentData);
}

async function loadDummyStudents(studentsData) {
    const saltRounds = 10; // saltRounds are needed to increase the degree of hashing

    let promises = studentsData.map(async student => {
        const salt = await bcrypt.genSalt(saltRounds);
        const passEncrypt = await bcrypt.hash(student.password, salt);
        const studentDataWithEncryptedPassword = {
            studentId: student.studentId,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            programmeId: student.programmeId,
            password: passEncrypt,
            year: student.year
        };
        return createStudent(studentDataWithEncryptedPassword);
    });

    try {
        await Promise.all(promises);
        console.log("Loaded Students");
    } catch (e) {
        console.error("Error loading students: ", e);
    }
}

async function createSemester(semesterData) {
    return Semester.create(semesterData);
}

async function loadDummySemesters(semesterData) {
    let promises = semesterData.map(createSemester);
    try {
        await Promise.all(promises);
        console.log("Loaded Semesters");
    } catch (e) {
        console.error("Error loading semesters: ", e);
    }
}

async function createStudentCourse(studentCorseData) {
    return StudentCourse.create(studentCorseData);
}

async function loadDummyStudentCourses(studentCorseData) {
    let promises = studentCorseData.map(createStudentCourse);
    try {
        await Promise.all(promises);
        console.log("Loaded Student Courses");
    } catch (e) {
        console.error("Error loading student courses: ", e);
    }
}



async function createCourseGroup(courseCode, groupId) {
    return CourseGroup.create({ courseCode, groupId });
}
async function createPrequisite(courseCode, programmeId, groupId) {
    return Prerequisite.create({ courseCode, programmeId, groupId });
}
async function loadDummyPrereq_Coursegrp(courseData) {
    let promises = courseData.map(async (course) => {
        const target_course = await Course.findOne({
            attributes: ['code'],
            where: {
                code: course.code
            }
        });
        const prior_courses = course.prerequisites['courses'];
        const pre_logic = course.prerequisites['logic'];
        const prgms = await ProgrammeCourse.findAll({
            attributes: ['programmeId'],
            where: {
                courseCode: target_course.code
            }
        });

        const idlist = prgms.map(prog => prog.programmeId);
        let or_logic_promises = [];
        let and_logic_promises = [];
        const prereq_promises = idlist.map(async (progid) => {
            if (pre_logic === 'or') {
                or_logic_promises = prior_courses.map(async (course) => {
                    const group = await Group.create({});
                    const coursegrp_promise = createCourseGroup(course, group.id);
                    return createPrequisite(target_course.code, progid, group.id), coursegrp_promise;
                });
            }
            if (pre_logic === 'and') {
                const group = await Group.create({});
                and_logic_promises = prior_courses.map(async (course) => {
                    const coursegrp_promise = createCourseGroup(course, group.id);
                    return createPrequisite(target_course.code, progid, group.id), coursegrp_promise;
                });
            }
            return or_logic_promises.concat(and_logic_promises);
        });
        return Promise.all(prereq_promises)
    });
    try {
        await Promise.all(promises);
        console.log('Loaded Prerequisites and Course Groups from Courses');
    } catch (e) {
        console.error("Error loading Prerequisites and Course Groups from Courses: ", e);
    }
}

async function createAntireq(courseCode, antirequisiteCourseCode) {
    return Antirequisite.create({ courseCode, antirequisiteCourseCode });
}
async function loadDummyAntireq(courseData) {
    let promises = courseData.map(async (course) => {
        const target_course = await Course.findOne({
            attributes: ['code'],
            where: {
                code: course.code
            }
        });
        const counter_courses = course.antirequisites['courses'];

        const anti_logic = course.antirequisites['logic'];
        if (anti_logic !== 'none') {
            const antireq_promises = counter_courses.map(async (c) => {
                return createAntireq(target_course.code, c)
            });
            return Promise.all(antireq_promises);
        }

    });
    try {
        await Promise.all(promises);
        console.log('Loaded Anti-requisites from Courses');
    } catch (e) {
        console.error("Error loading Anti-requisites from Courses: ", e);
    }
}
async function createSemesterCourse(semesterId, courseCode) {
    return SemesterCourse.create({ semesterId, courseCode })
}
async function loadDummySemesterCourses(courseData) {
    let promises = courseData.map(async (course) => {
        const target_course = await Course.findOne({
            attributes: ['code'],
            where: {
                code: course.code
            }
        });
        const semester = await Semester.findOne({
            attributes: ['num'],
            where: {
                id: course.semester
            }
        });
        

        const courseCode = target_course.code;
        let semester_n = semester.num
        //for demo purposes
        if(semester_n == 2){
            semester_n = 8
        }
        return createSemesterCourse(semester_n, courseCode);
    });
    try {
        await Promise.all(promises);
        console.log('Loaded Semester Courses from Courses');
    } catch (e) {
        console.error("Error loading Semester Courses from Courses: ", e);
    }
}

async function createAdvisingSession(advisingSessionData) {
    return AdvisingSession.create(advisingSessionData);
}

async function loadAdvisingSession(advisingSessionData) {
    let promises = advisingSessionData.map(createAdvisingSession);
    try {
        await Promise.all(promises);
        console.log("Loaded Advising Sessions");
    } catch (e) {
        console.error("Error loading Advising Session: ", e);
    }
}

async function createSelectedCourse(selectedCourseData) {
    return SelectedCourse.create(selectedCourseData);
}

async function loadSelectedCourses(selectedCourseData) {
    let promises = selectedCourseData.map(createSelectedCourse);
    try {
        await Promise.all(promises);
        console.log("Loaded Selected Courses");
    } catch (e) {
        console.error("Error loading Selected Courses: ", e);
    }
}

(async () => {
    await db.sync({ force: true });
    await loadTypes(TypesJSON);
    await loadCourses(CoursesJSON);
    await loadProgrammes(ProgrammesJSON);
    await loadProgrammeCourses(ProgrammesJSON);
    await loadElectiveRequirements(ProgrammesJSON);
    await loadDummyStudents(StudentsJSON);
    await loadDummySemesters(SemestersJSON);
    await loadDummyStudentCourses(StudentCoursesJSON);
    await loadDummyPrereq_Coursegrp(CoursesJSON);
    await loadDummyAntireq(CoursesJSON);
    await loadDummySemesterCourses(CoursesJSON);
    await loadAdvisingSession(AdvisingSessionsJSON);
    await loadSelectedCourses(SelectedCourseJSON);
    console.log('Done');
})()