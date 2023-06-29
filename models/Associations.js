const Student = require("./student");
const Transcript = require("./transcript");
const AwaredDegree = require("./awardedDegree");
const StudentCourse = require("./studentCourse");
const AdvisingSession = require("./advisingSession");
const Programme = require("./programme");
const ElectiveRequirment = require("./electiveRequiremnt");
const ProgrammeCourse = require("./ProgrammeCourse");
const Type = require("./type");
const Semester = require("./semester");
const CareerCourse = require("./CareerCourse");
const Career = require("./career");
const Course = require("./course");
const AdvisedCourse = require("./advisedCourse");
const Antirequisite = require("./antirequisite");
const Prerequisite = require("./prerequisite");

// ----------STUDENT----------


// Student<--->Transcript

// A Student has one Transcript
Student.hasOne(Transcript, {
    foreignKey: 'studentId',
    allowNull: false,
});
// A Transcript belongs to one Student
Transcript.belongsTo(Student, {
    foreignKey: 'studentId',
    allowNull: false
})


// Student<--->AwardedDegree

// A Student has many Awarded Degrees
Student.hasMany(AwaredDegree, {
    foreignKey: 'studentId',
    allowNull: false
})
// An Awarded Degree belongs to one Student
AwaredDegree.belongsTo(Student, {
    foreignKey: 'studentId',
    allowNull: false
})


// Student<--->StudentCourse

// A Student has many StudentCourse
Student.hasMany(StudentCourse, {
    foreignKey: 'studentId',
    allowNull: false
})
// A StudentCourse belongs to one Student
StudentCourse.belongsTo(Student, {
    foreignKey: 'studntId',
    allowNull: false
})


// Student<--->AdvisingSession

// A Student has many Advising Sessions 
Student.hasMany(AdvisingSession, {
    foreignKey: 'studentId',
    allowNull: false
})
// An Advising Session belong to one Student
AdvisingSession.belongsTo(Student, {
    foreignKey: 'studentId',
    allowNull: false
})



// ----------PROGRAMME----------


// Programme<--->AwardedDegree

// A Programme has many Awarded Degrees
Programme.hasMany(AwaredDegree, {
    foreignKey: 'programmeId',
    allowNull: false
})
// An Awarded Degree belongs to one Programme
AwaredDegree.belongsTo(Programme, {
    foreignKey: 'programmeId',
    allowNull: false
})


// Programme<--->ElectiveRequirment

// A Programme has many ElectiveRequirment
Programme.hasMany(ElectiveRequirment, {
    foreignKey: 'programmeId',
    allowNull: false
})
// An Elective Requirement belongs to one Programme
ElectiveRequirment.belongsTo(Programme, {
    foreignKey: 'programmeId',
    allowNull: false
})


// Programme<--->ProgrammeCourse

// A Programme has many Programme Courses
Programme.hasMany(ProgrammeCourse, {
    foreignKey: 'programmeId',
    allowNull: false
})
// A Programme Course belongs to one Programme
ProgrammeCourse.belongsTo(Programme, {
    foreignKey: 'programmeId',
    allowNull: false
})



//----------TYPE----------****


// Type<--->ProgrammeCourse

// A Type belongs to many Programme Courses
Type.hasMany(ProgrammeCourse, {
    foreignKey: 'typeId',
    allowNull: false
})
// A Programme Course has one Type
ProgrammeCourse.belongsTo(Type, {
    foreignKey: 'typeId',
    allowNull: false
})

// Type<--->Elective Requirement

// A Type has many Elective Requirements
Type.hasMany(ElectiveRequirment, {
    foreignKey: 'typeId',
    allowNull: false
})
// An Elective Requirement belongs to Type
ElectiveRequirment.belongsTo(Type, {
    foreignKey: 'typeId',
    allowNull: false
})


//----------Semester----------


// Semester<--->StudentCourse

// A Semester has many Student Course
Semester.hasMany(StudentCourse, {
    foreignKey: 'semesterId',
    allowNull: false
})
// A Student Course has one Semester**
StudentCourse.hasOne(Semester, {
    foreignKey: 'semesterId',
    allowNull: false
})


// Semester<--->AdvisingSession

// A Semester has many Advising Session
Semester.hasMany(AdvisingSession, {
    foreignKey: 'semesterId',
    allowNull: false
})
// An Advising Session belongs to one Semester
AdvisingSession.belongsTo(Semester, {
    foreignKey: 'semesterId',
    allowNull: false
})



// ----------Advising Session----------


// AdvisingSession<--->AdvisedCourse

// An Advising Session has many Advised Courses
AdvisingSession.hasMany(AdvisedCourse, {
    foreignKey: 'advisingSessionId',
    allowNull: false
})
// An Advised Course belongs to one Advising Session
AdvisedCourse.belongsTo(AdvisingSession, {
    foreignKey: 'advisingSessionId',
    allowNull: false
})


// ----------Course----------


// Course<--->StudentCourse

// A Course has many Student Course
Course.hasMany(StudentCourse, {
    foreignKey: 'courseCode',
    allowNull: false
})
// A Student Course belongs to one Course
StudentCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})


// Course<--->ProgrammeCourse

// A Course has many Programme Courses
Course.hasMany(ProgrammeCourse, {
    foreignKey: 'courseCode',
    allowNull: false
})
// A Programme Course belongs to one Course
ProgrammeCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})


// Course<--->AdvisedCourse

// A Course has many Advised Courses
Course.hasMany(AdvisedCourse, {
    foreignKey: 'courseCode',
    allowNull: false

})
// An Advised Course belongs to one Course
AdvisedCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})


// Course<--->CareerCourse

// A Course has many Career Courses
Course.hasMany(CareerCourse, {
    foreignKey: 'courseCode',
    allowNull: false
})
// A Career Course belongs to one Course
CareerCourse.belongsTo(Career, {
    foreignKey: 'courseCode',
    allowNull: false
})


// Anti-Requisite<--->Course **

// A Course has many Anti-Requisites
Course.hasMany(Antirequisite, {
    foreignKey: 'courseCode',
    allowNull: false
})
// An Anit-Requisite belongs to one Course
Antirequisite.belongsTo(course, {
    foreignKey: 'courseCode',
    allowNull: false
})


//Prerequisite<--->Course
// A Course has many Prerequisites
Course.hasMany(Prerequisite, {
    foreignKey: 'courseCode',
    allowNull: false
})
// An Prerequisite belongs to one Course
Prerequisite.belongsTo(course, {
    foreignKey: 'courseCode',
    allowNull: false
})
