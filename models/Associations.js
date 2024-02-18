const { Sequelize } = require("sequelize");

const Student = require("./Student");
const Transcript = require("./Transcript");
const AwaredDegree = require("./AwardedDegree");
const StudentCourse = require("./StudentCourse");
const AdvisingSession = require("./AdvisingSession");
const Programme = require("./Programme");
const ElectiveRequirement = require("./ElectiveRequirement");
const ProgrammeCourse = require("./ProgrammeCourse");
const Type = require("./Type");
const Semester = require("./Semester");
const CareerCourse = require("./CareerCourse");
const Course = require("./Course");
const SelectedCourse = require("./SelectedCourse");
const Antirequisite = require("./Antirequisite");
const Prerequisite = require("./Prerequisite");
const CourseGroup = require("./CourseGroup");
const Group = require("./Group");
const SemesterCourse = require("./SemesterCourse");

// ----------STUDENT----------


// Student<--->Transcript

// A Student has one Transcript
Student.hasOne(Transcript, {
    foreignKey: 'studentID',
    allowNull: false,
});
// A Transcript belongs to one Student
Transcript.belongsTo(Student, {
    foreignKey: 'studentID',
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


Student.belongsTo(Programme, {
    foreignKey: 'programmeId',
    allowNull: true, // Change to false if each student must have a programme
});

// A Programme can have many Students
Programme.hasMany(Student, {
    foreignKey: 'programmeId',
});



// Student<--->StudentCourse

// A Student has many StudentCourse
Student.hasMany(StudentCourse, {
    foreignKey: 'studentId',
    allowNull: false
})
// A StudentCourse belongs to one Student
StudentCourse.belongsTo(Student, {
    foreignKey: 'studentId',
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


// Programme<-->Prerequisite

// A programme hase many prerequisites
Programme.hasMany(Prerequisite, {
    foreignKey: 'programmeId',
    allowNull: false
})
// A prerequisite belongs to Programme
Prerequisite.belongsTo(Programme, {
    foreignKey: 'programmeId',
    allowNull: false
})


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


// Programme<--->ElectiveRequirement

// A Programme has many ElectiveRequirement
Programme.hasMany(ElectiveRequirement, {
    foreignKey: 'programmeId',
    allowNull: false
})
// An Elective Requirement belongs to one Programme
ElectiveRequirement.belongsTo(Programme, {
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
Type.hasMany(ElectiveRequirement, {
    foreignKey: 'typeId',
    allowNull: false
})
// An Elective Requirement belongs to Type
ElectiveRequirement.belongsTo(Type, {
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
StudentCourse.belongsTo(Semester, {
    foreignKey: 'semesterId',
    allowNull: false
})


// Semester<--->SemesterCourse

// A Semester has many SemesterCourse
Semester.hasMany(SemesterCourse, {
    foreignKey: 'semesterId',
    allowNull: false
})
// A SemesterCourse has one Semester**
SemesterCourse.belongsTo(Semester, {
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


// AdvisingSession<--->SelectedCourse

// An Advising Session has many Advised Courses
AdvisingSession.hasMany(SelectedCourse, {
    foreignKey: 'advisingSessionId',
    allowNull: false
})
// An Advised Course belongs to one Advising Session
SelectedCourse.belongsTo(AdvisingSession, {
    foreignKey: 'advisingSessionId',
    allowNull: false
})


// ----------Course----------


// Course<-->Semester Course

Course.hasMany(SemesterCourse, {
    foreignKey: 'courseCode',
    allowNull: false
})
SemesterCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})
// Selected


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


// Course<--->SelectedCourse

// A Course has many Advised Courses
Course.hasMany(SelectedCourse, {
    foreignKey: 'courseCode',
    allowNull: false

})
// An Advised Course belongs to one Course
SelectedCourse.belongsTo(Course, {
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
CareerCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})



//Prerequisite<--->Course
// A Course has many Prerequisites
Course.hasMany(Prerequisite, {
    foreignKey: {
        name: 'courseCode',
        type: Sequelize.STRING
    },
    allowNull: false
})
// An Prerequisite belongs to one Course
Prerequisite.belongsTo(Course, {
    foreignKey: {
        name: 'courseCode',
        type: Sequelize.STRING
    },
    allowNull: false
})


// Anti-Requisite<--->Course **

// A Course has many Anti-Requisites
Course.hasMany(Antirequisite, {
    foreignKey: 'courseCode',
    allowNull: false
})
// An Anit-Requisite belongs to one Course
Antirequisite.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})

// A Course has many Anti-Requisites
Course.hasMany(Antirequisite, {
    foreignKey: 'antirequisiteCourseCode',
    allowNull: false
})
// An Anit-Requisite belongs to one Course
Antirequisite.belongsTo(Course, {
    foreignKey: 'antirequisiteCourseCode',
    allowNull: false
})

// course<-->CourseGroup
// a course has many courseGroup
Course.hasMany(CourseGroup, {
    foreignKey: 'courseCode',
    allowNull: false
})
// a coursegroup belongs to course
CourseGroup.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
})


// ----------Group----------

// A Group has many Prerequisites
Group.hasMany(Prerequisite, {
    foreignKey: {
        name: 'groupId',
    },
    allowNull: false
})
// An Prerequisite belongs to one Group
Prerequisite.belongsTo(Group, {
    foreignKey: {
        name: 'groupId',
    },
    allowNull: false
})


// A Group has many CourseGroup
Group.hasMany(CourseGroup, {
    foreignKey: {
        name: 'groupId',
    },
    allowNull: false
})
// An CourseGroup belongs to one Group
CourseGroup.belongsTo(Group, {
    foreignKey: {
        name: 'groupId',
    },
    allowNull: false
})