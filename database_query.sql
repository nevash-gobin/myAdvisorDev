-- Active: 1718229743732@@127.0.0.1@3306
SELECT * FROM Transcripts
WHERE studentId = 816030787;

SELECT * FROM AwardedDegrees
WHERE studentId = 816030787;

SELECT * FROM Students
WHERE programmeId = 1;

SELECT Courses.* FROM Courses
JOIN StudentCourses ON Courses.code = StudentCourses.courseCode
WHERE StudentCourses.studentId = 816030787;

SELECT * FROM AdvisingSessions
WHERE studentId = 816030787;

SELECT * FROM Prerequisites
WHERE programmeId = 1;

SELECT * FROM ElectiveRequirements
WHERE programmeId = 1;

SELECT Courses.* FROM Courses
JOIN ProgrammeCourses ON Courses.code = ProgrammeCourses.courseCode
WHERE ProgrammeCourses.programmeId = 1;

SELECT Courses.* FROM Courses
JOIN SemesterCourses ON Courses.code = SemesterCourses.courseCode
WHERE SemesterCourses.semesterId = 8;

SELECT * FROM AdvisingSessions
WHERE semesterId = 3;

SELECT Courses.* FROM Courses
JOIN SelectedCourses ON Courses.code = SelectedCourses.courseCode
WHERE SelectedCourses.advisingSessionId = 11;

SELECT * FROM Prerequisites
WHERE courseCode = "COMP3608";

SELECT * FROM Antirequisites
WHERE courseCode = "COMP3608" OR antirequisiteCourseCode = "COMP2604";

SELECT * FROM CourseGroups;

SELECT * FROM CourseGroups
WHERE courseCode = "COMP3608";

SELECT Courses.* FROM Courses
JOIN CourseGroups ON Courses.code = CourseGroups.courseCode
WHERE CourseGroups.groupId = 3;

SELECT * FROM Prerequisites;


-- Eligible courses for student by studentId query
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