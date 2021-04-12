import React, { useState, useEffect } from "react";
import StudentsTable from './StudentsTable';

function Students() {
    //Table
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    //Get Students
    async function getStudents() {
        try {
            const res = await fetch("/transcript/details/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setStudents(parseData);
            setLoading(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getStudents();
    }, []);
    
    return (
        <>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <StudentsTable students={students} loading={loading} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Students;