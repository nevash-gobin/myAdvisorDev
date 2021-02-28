import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CoursesTable from "./CoursesTable";
import AddCourse from "./AddCourse";

function Courses() {
    //Add Course Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //Table
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getCourses() {
        try {
          const res = await fetch("http://localhost:5000/courses/all", {
            method: "GET",
          });
    
          const parseData = await res.json();
          setCourses(parseData);
          setLoading(false);
          
        } catch (err) {
          console.error(err.message);
        }
    }

    useEffect(() => {
        getCourses();
    }, []);


    function refreshTable(){
        setLoading(true);
        getCourses();
    }

    return (
        <>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <CoursesTable courses={courses} loading={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-primary add-course" onClick={handleShow}>Add Course</button>
                    </div>

                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add Course</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <AddCourse setShow={setShow} refreshTable={refreshTable}/>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Courses;