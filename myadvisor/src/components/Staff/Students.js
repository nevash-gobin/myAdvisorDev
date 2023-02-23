import React, { useState, useEffect } from "react";
import StudentsTable from './StudentsTable';
import {Jumbotron, Container} from 'react-bootstrap';

/*
    Students is a component that displays the students table component.
*/
function Students() {
    /*
        The students state is used store all the students that will be displayed in the table.
        The loading state is used to keep track of getting the students from the server. 
        It's initial state is true, so the table will not be displayed until the system has fetched all students.
    */ 
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        getStudents creates a get request to the server that gets all the students on the system and stores it in the students state.
    */
    async function getStudents() {
        try {
            const res = await fetch("/transcript/details/all", {
            method: "GET",
        });
            
            const parseData = await res.json();
            console.log(parseData);
            
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
            <Jumbotron fluid>
                <Container>
                    <h2>Students</h2>
                </Container>
            </Jumbotron>
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