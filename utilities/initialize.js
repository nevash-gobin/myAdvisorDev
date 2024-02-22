//import all models and insert data into the database
//datab
const ProgrammesJSON = require("../programmes.json");
const CoursesJSON = require("../courses.json");
const TypesJSON = require("../types.json");

// models
// const Admin = require("../models/Admin");
// const AdvisedCourse = require("../models/SelectedCourse");
// const AdvisingSesssion = require("../models/AdvisingSession")
const Antirequisite = require("../models/Antirequisite");
// const AwardedDegree = require("../models/AwardedDegree");
const Course = require("../models/Course");
// const ElectiveRequirement = require("../models/ElectiveRequirement");
// const PotentialGraduate = require("../models/PotentialGraduate");
const Prerequisite = require("../models/Prerequisite");
const Programme = require("../models/Programme");
const ProgrammeCourse = require("../models/ProgrammeCourse");
// const Semester = require("../models/Semester");
// const Student = require("../models/Student");
// const StudentCourse = require("../models/StudentCourse");
// const Transcript = require("../models/Transcript");
const Type = require("../models/Type");
// const Group = require("../models/Group");
// const CourseGroup = require("../models/CourseGroup");
// const SemesterCourse = require("../models/SemesterCourse");

const db = { Programme, Course, Type, ProgrammeCourse };

async function createTypes(TypesJSON) {
    try {
        for (const typeData of TypesJSON) {
            const { type } = typeData;

            const existingType = await Type.findOne({
                where: { type: type },
            });

            if (existingType) {
                console.log(`Type '${type}' already exists. Skipping creation.`);
                continue;
            }

            await Type.create({
                type: type,
            });

            console.log(`Type created: ${type}`);
        }

        console.log("Types import successful.");
    } catch (error) {
        console.error("Error importing types:", error);
    }
}

async function createCourse(CoursesJSON) {
    for (const courseData of CoursesJSON) {
        try {
            const newCourse = await Course.create({
                courseCode: courseData.code,
                courseTitle: courseData.title,
                level: courseData.level,
                semester: courseData.semester.toString(),
                credits: courseData.credits,
                faculty: courseData.faculty,
                department: courseData.department,
                description: courseData.description,
            });

            console.log(`Course created: ${newCourse.courseCode} - ${newCourse.courseTitle}`);

            // // Create Prerequisites
            // if (courseData.prerequisites) {
            //     const prerequisites = courseData.prerequisites.split(' OR ');
            //     for (const prereqCode of prerequisites) {
            //         const prereq = await Prerequisite.create({
            //             courseCode: newCourse.courseCode,
            //             prerequisiteCourseCode: prereqCode,
            //         });
            //         console.log(`Prerequisite created for ${newCourse.courseCode}: ${prereq.prerequisiteCourseCode}`);
            //     }
            // }

            // // Create Antirequisites
            // if (courseData.antirequisites) {
            //     const antirequisites = courseData.antirequisites.split(' OR ');
            //     for (const antireqCode of antirequisites) {
            //         const antireq = await Antirequisite.create({
            //             courseCode: newCourse.courseCode,
            //             antirequisiteCourseCode: antireqCode,
            //         });
            //         console.log(`Antirequisite created for ${newCourse.courseCode}: ${antireq.antirequisiteCourseCode}`);
            //     }
            // }

        } catch (error) {
            console.error(`Error creating course: ${courseData.code} - ${courseData.title}`, error);
        }
    }
}

async function createProgramme(ProgrammesJSON) {
    try {
        // Loop through each program in the ProgrammesJSON array
        for (const programData of ProgrammesJSON) {
            // Extract program details
            const [programName, programDetails] = Object.entries(programData)[0];
            const { Courses, Faculty, Department, Requirements, Enrollment } = programDetails;

            // Create the program in the Programme table
            const newProgramme = await Programme.create({
                name: programName,
                faculty: Faculty,
                department: Department,
                enrollment: Enrollment,
                l1Core: Requirements.L1CORE,
                l2Core: Requirements.L2CORE,
                l3Core: Requirements.L3CORE,
                cimElective: Requirements.CIMELECTIVE,
                ciElective: Requirements.CIELECTIVE,
                adElective: Requirements.ADVELECTIVE,
                foun: Requirements.FOUN,
            });

            console.log(`Programme created: ${newProgramme.name}`);

            // Loop through each course in the program
            for (const [courseCode, type] of Object.entries(Courses)) {
                // Find the corresponding Type entry in the database
                const existingType = await Type.findOne({
                    where: { type: type },
                });

                if (!existingType) {
                    console.error(`Error: Type '${type}' not found for course '${courseCode}'. Skipping course creation.`);
                    continue;
                }

                // Create the course in the ProgrammeCourse table
                const newProgrammeCourse = await ProgrammeCourse.create({
                    programmeId: newProgramme.id,
                    courseCode: courseCode,
                    typeId: existingType.id,
                });

                console.log(`ProgrammeCourse created: ${newProgrammeCourse.courseCode} - ${newProgrammeCourse.typeId}`);

            }
        }

        console.log("Programmes import successful.");
    } catch (error) {
        console.error("Error importing programmes:", error);
    }
}

async function createProgrammeCourse(ProgrammesJSON) {
    try {
        // Loop through each program in the ProgrammesJSON array
        for (const programData of ProgrammesJSON) {
            // Extract program details
            const [programName, programDetails] = Object.entries(programData)[0];
            console.log(programName);
            const { Courses } = programDetails;

            // Find or create the program in the Programme table
            const [newProgramme, created] = await Programme.findOrCreate({
                where: { name: programName },
            });

            if (created) {
                console.log(`Programme created: ${newProgramme.name} - ${newProgramme.id}`);
            } else {
                console.log(`Programme found: ${newProgramme.programName} - ${newProgramme.id}`);
            }

            // Loop through each course in the program
            for (const [courseCode, type] of Object.entries(Courses)) {
                // Find the corresponding Type entry in the database
                const existingType = await Type.findOne({
                    where: { type: type },
                });

                if (!existingType) {
                    console.error(`Error: Type '${type}' not found for course '${courseCode}'. Skipping course creation.`);
                    continue;
                }

                // Create the course in the ProgrammeCourse table
                const newProgrammeCourse = await ProgrammeCourse.create({
                    programmeId: newProgramme.id,
                    courseCode: courseCode,
                    typeId: existingType.id,
                });

                console.log(`ProgrammeCourse created: ${newProgrammeCourse.courseCode} - ${newProgrammeCourse.typeId}`);
            }
        }

        console.log("Programmes import successful.");
    } catch (error) {
        console.error("Error importing programmes:", error);
    }
}

// createCourse(CoursesJSON);

// createTypes(TypesJSON);

// createProgramme(ProgrammesJSON);

createProgrammeCourse(ProgrammesJSON);