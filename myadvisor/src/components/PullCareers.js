import React, { useEffect, useState } from "react";

const PullCareers = () => {
    const [careers, setCareers] = useState([]);
  
    async function getCareers() {
      try {
        const res = await fetch("/careers/all", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setCareers(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get career data
    useEffect(() => {
      getCareers();
    }, []);

    return (
        careers
      );
    };

export default PullCareers;