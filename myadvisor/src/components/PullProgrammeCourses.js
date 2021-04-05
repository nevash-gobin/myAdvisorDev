import React, { useEffect, useState } from "react";

const PullProgrammeCourses = (id) => {
    const [programmeCourses, setProgrammeCourses] = useState([]);
  
    async function getProgrammeCourses() {
        try {
          const res = await fetch(`/programmes/offered-courses/${id}`, {
            method: "GET",
            headers: { token: localStorage.token },
          });
    
          const parseData = await res.json();
          setProgrammeCourses(parseData);
        } catch (err) {
          console.error(err.message);
        }
    }

    useEffect(() => {
        getProgrammeCourses();
      }, []);
  
    return (
        programmeCourses
      );
    };

export default PullProgrammeCourses;
