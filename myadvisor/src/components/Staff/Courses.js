import React, { useState } from "react";
import CoursesTable from "./CoursesTable";

function Courses() {

    return (
        <div class="container">
            <div class="row mt-4">
                {/* Courses Table */}
                <div class="col-10">
                    <div class="card h-100">
                        <div class="card-body shadow-sm">
                            <CoursesTable/>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div class="col">
                    <button type="button" class="btn btn-primary add-course">Add Course</button>
                </div>
            </div>
        </div>
    );
}

export default Courses;