import React, { useEffect, useState } from "react";

const PullProgrammes = () => {
    const [programmes, setProgrammes] = useState([]);
  
    async function getProgrammes() {
      try {
        const res = await fetch(`/programmes/all`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setProgrammes(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }

    useEffect(() => {
        getProgrammes();
      }, []);
  
    return (
        programmes
      );
    };

export default PullProgrammes;