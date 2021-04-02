import React, { useState, useEffect } from "react";
import ReportsTable from './ReportsTable';

function Reports() {
    //Table
    const [sessions, setSessions] = useState([
        {studentID: 816000000, name: "Jane Doe", advisingDate: "1/1/2021", status: "Completed"},
        {studentID: 816000001, name: "John Doe", advisingDate: "1/1/2021", status: "Completed"}
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