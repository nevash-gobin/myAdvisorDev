import React, { useState, useEffect } from "react";
import {Jumbotron, Container} from 'react-bootstrap';
import SessionsTable from './SessionsTable';

/*
    Sessions is a component that displays the sessions table component.
*/
function Sessions() {
    /*
        The sessions state is used store all the sessions that will be displayed in the table.
        The students state is used to store all students on the system.
    */ 
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);

    /*
        getSessions creates a get request to the server that gets all the sessions on the system and stores it in the sessions state.
    */
    async function getSessions() {
        try {
            const res = await fetch("/admin/academic-advising/students/sessions", {
            method: "GET",
        });
            const parseData = await res.json();
            setSessions(parseData);

        } catch (err) {
            console.error(err.message);
        }
    }

    /*
        getStudents creates a get request to the server that gets all the students on the system and stores it in the students state.
    */
    async function getStudents() {
        try {
            const res = await fetch("/transcript/details/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setStudents(parseData);
            
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getSessions();
        getStudents();
    }, []);
    
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Sessions</h2>
                </Container>
            </Jumbotron>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                {console.log("hello")}
                                <SessionsTable sessions={sessions} students={students}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sessions;