import React, { useState, useEffect } from "react";
import ProgrammesTable from './ProgrammesTable';

function Programmes() {
    //Table
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);

    //Get Programmes
    async function getProgrammes() {
        try {
            const res = await fetch("http://localhost:5000/programmes/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setProgrammes(parseData);
            setLoading(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProgrammes();
    }, []);
    
    return (
        <>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <ProgrammesTable programmes={programmes} loading={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course">Add Programme</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Programmes;