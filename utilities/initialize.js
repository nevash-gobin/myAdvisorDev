//import all models and insert data into the database

// models
const Admin = require("../models/Admin");
const AdvisedCourse = require("../models/SelectedCourse");
const AdvisingSesssion = require("../models/AdvisingSession")
const Antirequisite = require("../models/Antirequisite");
const AwardedDegree = require("../models/AwardedDegree");
const Course = require("../models/Course");
const ElectiveRequirement = require("../models/ElectiveRequirement");
const PotentialGraduate = require("../models/PotentialGraduate");
const Prerequisite = require("../models/Prerequisite");
const Programme = require("../models/Programme");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const Semester = require("../models/Semester");
const Student = require("../models/Student");
const StudentCourse = require("../models/StudentCourse");
const Transcript = require("../models/Transcript");
const Type = require("../models/Type");
const Group = require("../models/Group");
const CourseGroup = require("../models/CourseGroup");
const SemesterCourse = require("../models/SemesterCourse");

const db = { Student, Programme, Semester, Course, StudentCourse, Transcript, AwardedDegree, Group, SemesterCourse };

const initialize = async () => {
};