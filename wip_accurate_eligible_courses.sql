-- This checks for eligible courses in the current semester

WITH CompletedCourses AS (
    SELECT courseCode
    FROM StudentCourses
    WHERE studentId = :studentId AND grade != 'F'
),
CurrentSemester AS (
    SELECT id as currentSemesterId
    FROM Semesters
    WHERE startDate <= CURRENT_DATE AND endDate >= CURRENT_DATE
),
EnrolledCourses AS (
    SELECT courseCode
    FROM StudentCourses
    WHERE studentId = :studentId AND semesterId = (SELECT currentSemesterId FROM CurrentSemester)
),
StudentProgramme AS (
    SELECT programmeId
    FROM Students
    WHERE studentId = :studentId
),
EligibleCourses AS (
    SELECT DISTINCT c.code
    FROM Courses c
    JOIN ProgrammeCourses pc ON c.code = pc.courseCode
    JOIN StudentProgramme sp ON pc.programmeId = sp.programmeId
    WHERE c.code NOT IN (SELECT courseCode FROM CompletedCourses)
      AND c.code NOT IN (SELECT courseCode FROM EnrolledCourses)
      AND NOT EXISTS (
          SELECT 1
          FROM Prerequisites p
          WHERE p.courseCode = c.code
            AND (p.groupId IS NULL AND p.courseCode NOT IN (SELECT courseCode FROM CompletedCourses))
            OR (p.groupId IS NOT NULL AND NOT EXISTS (
                SELECT 1
                FROM CourseGroups cg
                JOIN CompletedCourses cc ON cg.courseCode = cc.courseCode
                WHERE cg.groupId = p.groupId
            ))
      )
      AND NOT EXISTS (
          SELECT 1
          FROM Antirequisites a
          WHERE (a.courseCode = c.code OR a.antirequisiteCourseCode = c.code)
            AND (a.courseCode IN (SELECT courseCode FROM CompletedCourses)
                 OR a.antirequisiteCourseCode IN (SELECT courseCode FROM CompletedCourses)
                 OR a.courseCode IN (SELECT courseCode FROM EnrolledCourses)
                 OR a.antirequisiteCourseCode IN (SELECT courseCode FROM EnrolledCourses))
      )
)
SELECT c.*
FROM Courses c
JOIN EligibleCourses ec ON c.code = ec.code
JOIN SemesterCourses sc ON c.code = sc.courseCode
WHERE sc.semesterId = (SELECT currentSemesterId FROM CurrentSemester);