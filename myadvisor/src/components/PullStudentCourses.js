import React, { useEffect, useState } from "react";

const PullStudentCourses = (studentId) => {
    const [courses, setCourses] = useState([]);
  
    async function getCourses() {
      try {
        const res = await fetch(`/transcript/courses/viewAll/${studentId}`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setCourses(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get student course data
    useEffect(() => {
      getCourses();
    }, []);

    return (
        courses
      );
    };

export default PullStudentCourses;