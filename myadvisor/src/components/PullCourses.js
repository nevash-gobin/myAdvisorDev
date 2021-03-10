import React, { useEffect, useState } from "react";

const PullCourses = () => {
    const [courses, setCourses] = useState([]);
  
    async function getCourses() {
      try {
        const res = await fetch("/courses/all", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setCourses(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get course data
    useEffect(() => {
      getCourses();
    }, []);

    return (
        courses
      );
    };

export default PullCourses;