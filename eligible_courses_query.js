const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

async function getEligibleCourses(studentId) {
    const query = `
    WITH student_programme AS (
    SELECT programmeId 
    FROM Students 
    WHERE studentId = :studentId
    ),
    taken_courses AS (
        SELECT courseCode 
        FROM StudentCourses 
        WHERE studentId = :studentId AND grade != 'F'
    ),
    antireqs AS (
        SELECT antirequisiteCourseCode 
        FROM Antirequisites 
        WHERE courseCode IN (SELECT courseCode FROM taken_courses)
    )
    SELECT DISTINCT c.code, c.title
    FROM Courses c
    JOIN ProgrammeCourses pc ON c.code = pc.courseCode
    JOIN student_programme sp ON pc.programmeId = sp.programmeId
    WHERE c.code NOT IN (SELECT courseCode FROM taken_courses)
    AND c.code NOT IN (SELECT antirequisiteCourseCode FROM antireqs)
    AND NOT EXISTS (
        SELECT 1
        FROM Prerequisites p
        WHERE p.courseCode = c.code
            AND p.groupId IS NULL
            AND p.courseCode NOT IN (SELECT courseCode FROM taken_courses)
    )
    AND NOT EXISTS (
        SELECT 1
        FROM Prerequisites p
        JOIN CourseGroups cg ON p.groupId = cg.groupId
        WHERE p.courseCode = c.code
            AND p.groupId IS NOT NULL
            AND NOT EXISTS (
                SELECT 1
                FROM taken_courses tc
                WHERE tc.courseCode = cg.courseCode
            )
    );
  `;

    const results = await sequelize.query(query, {
        replacements: { studentId: studentId },
        type: sequelize.QueryTypes.SELECT
    });

    console.log(results);
}

async function getCoursesByType(type) {
    const query = `
    SELECT c.code, c.title
    FROM Courses c
    JOIN ProgrammeCourses pc ON c.code = pc.courseCode
    JOIN Types t ON pc.typeId = t.id
    WHERE t.type = :type
  `;

    const results = await sequelize.query(query, {
        replacements: { type: type },
        type: sequelize.QueryTypes.SELECT
    });

    console.log(results);
}

async function getTranscript(studentId) {
    const query = `
    SELECT
        s.studentId,
        t.id AS transcriptId,
        sc.courseCode,
        c.title AS courseTitle,
        sc.grade,
        se.num AS semesterNumber,
        se.academicYear AS semesterYear
    FROM
        Students s
        JOIN Transcripts t ON s.studentId = t.studentId
        JOIN StudentCourses sc ON s.studentId = sc.studentId
        JOIN Courses c ON sc.courseCode = c.code
        JOIN Semesters se ON sc.semesterId = se.id
    WHERE
        s.studentId = :studentId;
    `;

    try {
        const results = await sequelize.query(query, {
            replacements: { studentId: studentId },
            type: sequelize.QueryTypes.SELECT
        });

        console.log(results);
        return results;
    } catch (error) {
        console.error("Error fetching transcript:", error);
    }
}

async function getStudentCourses(studentId) {
    const query = `
    SELECT
        s.studentId,
        sc.courseCode,
        c.title AS courseTitle,
        sc.grade,
        se.num AS semesterNumber,
        se.academicYear AS semesterYear
    FROM
        Students s
        JOIN StudentCourses sc ON s.studentId = sc.studentId
        JOIN Courses c ON sc.courseCode = c.code
        JOIN Semesters se ON sc.semesterId = se.id
    WHERE
        s.studentId = :studentId;
    `;

    try {
        const results = await sequelize.query(query, {
            replacements: { studentId: studentId },
            type: sequelize.QueryTypes.SELECT
        });

        console.log(results);
        return results;
    } catch (error) {
        console.error("Error fetching student courses:", error);
    }
}

async function getAllTables() {
    const query = `
    SELECT name 
    FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name;
    `;

    try {
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        console.log("Available tables:");
        results.forEach(result => {
            console.log(result.name);
        });

        return results.map(result => result.name);
    } catch (error) {
        console.error("Error fetching table names:", error);
    }
}

async function getAllStudentInformation() {
    const query = `
      SELECT 
          s.studentId AS studentId,
          s.firstName AS firstName,
          s.lastName AS lastName,
          s.year as year,
          s.email AS email,
          s.programmeId AS programmeId,
          p.name AS programmeName,
          p.faculty AS programmeFaculty,
          p.department AS programmeDepartment,
          p.version AS programmeVersion,
          t.id AS transcriptId,
          t.gpa AS transcriptGPA,
          t.degree AS transcriptDegree,
          t.major AS transcriptMajor,
          t.admitTerm AS transcriptAdmitTerm,
          t.degreeAttemptHours AS transcriptAttemptHours,
          t.degreePassedHours AS transcriptPassedHours,
          t.degreeEarnedHours AS transcriptEarnedHours,
          t.degreeGpaHours AS transcriptGPAHours,
          t.degreeQualityPoints AS transcriptQualityPoints,
          ad.dateawarded AS awardedDegreeDate,
          sc.courseCode AS enrolledCourseCode,
          c.title AS enrolledCourseTitle,
          c.credits AS enrolledCourseCredits,
          c.semester AS enrolledCourseSemester,
          sc.grade AS enrolledCourseGrade
      FROM 
          Students s
      LEFT JOIN 
          Programmes p ON s.programmeId = p.id
      LEFT JOIN 
          Transcripts t ON s.studentId = t.studentId
      LEFT JOIN 
          AwardedDegrees ad ON s.studentId = ad.studentId
      LEFT JOIN 
          StudentCourses sc ON s.studentId = sc.studentId
      LEFT JOIN 
          Courses c ON sc.courseCode = c.code
      ORDER BY 
          s.studentId;
    `;

    try {
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        console.log(results);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


// getEligibleCourses(816030787).catch(err => console.error(err));
// getCoursesByType('L1CORE').catch(err => console.error(err));
// getTranscript('816030787').catch(err => console.error(err));
// getStudentCourses('816030787').catch(err => console.error(err));
// getAllTables().catch(err => console.error(err));
getAllStudentInformation().catch(err => console.error(err));