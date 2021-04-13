import React, { useState, useEffect } from "react";
import ReportsTable from './ReportsTable';

/*
    Reports is a component that displays the reports table component.
*/

function Reports() {
    /*
        The sessions state is used to store all advising sessions from students.
        The loading state is used to  keep track of getting the courses from the server. 
    */
    const [sessions, setSessions] = useState([
        {studentID: 816000000, name: "Jane Doe", year: 1, advisingDate: "1/1/2021", status: "Complete"},
        {studentID: 816000001, name: "John Doe", year: 2, advisingDate: "1/1/2021", status: "Complete"},
        {studentID: 816000002, name: "Jack Doe", year: 3, advisingDate: "1/1/2021", status: "Incomplete"}
    ]);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <ReportsTable sessions={sessions} loading={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course" >Archive</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reports;