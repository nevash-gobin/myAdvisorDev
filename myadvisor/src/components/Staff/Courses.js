import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CoursesTable from "./CoursesTable";
import AddCourse from "./AddCourse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {
    //Add Course Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //Table
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    //Toast
    const notifyDelete = (text) => toast.error(text);

    //Get Courses
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

    //Delete Course
    async function deleteCourse(courseCode) {
        try {
          const res = await fetch("http://localhost:5000/courses/delete/" + courseCode, {
            method: "DELETE",
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiI4MTYwMTQ5MjQiLCJpYXQiOjE2MTQ0NjY4MTIsImV4cCI6MTYxNDU1MzIxMn0.uH77uW4WO6zi4Itd2WYXynxS_wDMZm3WcCBRQPgZRpE"
            },
          });
    
            setLoading(false);
            refreshTable();
            notifyDelete(courseCode + " Deleted")
          
        } catch (err) {
            notifyDelete(err.message)
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
                                <CoursesTable courses={courses} loading={loading} deleteCourse={deleteCourse}/>
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
            <ToastContainer 
                pauseOnHover
                position="bottom-right"
            />
        </>
    );
}

export default Courses;