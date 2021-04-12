import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CoursesTable from "./CoursesTable";
import AddCourse from "./AddCourse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
          const res = await fetch("/courses/all", {
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
          const res = await fetch("/courses/delete/" + courseCode, {
            method: "DELETE",
            headers: {
                token: localStorage.getItem("token")
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

    function confirmDelete(courseCode){
        confirmAlert({
          title: 'Delete Confirmation',
          message: 'Are you sure to do delete ' + courseCode + "?",
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteCourse(courseCode)
            },
            {
              label: 'No',
            }
          ]
        });
    };

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
                                <CoursesTable courses={courses} loading={loading} confirmDelete={confirmDelete} refreshTable={refreshTable}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course" onClick={handleShow}>Add Course</button>
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