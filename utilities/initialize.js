//import all models and insert data into the database

const db = require('../models');
const { Student, Programme, Semester, Course, StudentCourse, Transcript, AwardedDegree, Group, SemesterCourse } = db;

const initialize = async () => {

