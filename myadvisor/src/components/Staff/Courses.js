import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CoursesTable from "./CoursesTable";
import AddCourse from "./AddCourse";
import {Jumbotron, Container} from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

/*
    Courses is a component that displays the courses table and addCourses component.
*/

function Courses() {
    /*
        The show state is used to keep track of the visibility of the addCourses modal.
        It's initial state is false.
        handleShow sets the show state to true, which displays the modal.
        handleClose sets the show state to false, which closes the modal.
    */ 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*
        The courses state is used store all the courses that will be displayed in the table.
        The loading state is used to keep track of getting the courses from the server. 
        It's initial state is true, so the table will not be displayed until the system has fetched all courses.
    */ 
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        notifyDelete is used to display a toast notifications when a course is deleted. It displays a red toast.
    */
    const notifyDelete = (text) => toast.error(text);

    /*
        getCourses creates a get request to the server that gets all the courses on the system and stores it in the courses state.
    */
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

    /*
        deleteCourse creates a delete request to the server that deletes the course with the specified course id
    */
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
            notifyDelete(courseCode + " Deleted");
          
        } catch (err) {
            notifyDelete(err.message);
            console.error(err.message);
        }
    }

    /*
        confirmDelete is a popup that asks the user to confirm that they want to delete a course
    */
    function confirmDelete(courseCode){
        confirmAlert({
          title: 'Delete Confirmation',
          message: 'Are you sure you want to delete ' + courseCode + "?",
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

    /*
        refreshTable sets the loading state to true and gets the courses from the system.
    */
    function refreshTable(){
        setLoading(true);
        getCourses();
    }

    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Courses</h2>
                </Container>
            </Jumbotron>
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