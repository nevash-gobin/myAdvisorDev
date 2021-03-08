import React, { useEffect, useState } from "react";

const PullDetails = () => {
    const [details, setDetails] = useState([]);
  
    async function getDetails() {
      try {
        const res = await fetch("/transcript/all", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setDetails(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get student details data
    useEffect(() => {
      getDetails();
    }, []);

    return (
        details
      );
    };

export default PullDetails;