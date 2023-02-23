import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    AddCourse allows a staff member to add courses to the system.
*/

function AddCourse({setShow, refreshTable}) {
    /*
        The validated state is used to keep track of the validity of the add course form.
        It's initial state is false.
    */    
    const [validated, setValidated] = useState(false);

    /*
        notifyAdded is used to display toast notifications for events. It displays a green toast.
    */    
    const notifyAdded = (text) => toast.success(text);

    /*
        HandleSubmit gets the data from the form as passes it to the addCourse function.
    */    
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        const formData = {
            courseCode : (form.elements.courseCode.value).replace(/\s+/g, ''),
            courseTitle : form.elements.courseTitle.value,
            credits : form.elements.credits.value,
            semester : form.elements.semester.value,
            level : form.elements.level.value,
            prerequisites : form.elements.prerequisites.value,
            description: form.elements.description.value,
            coursework: String(form.elements.coursework.value) + "%",
            finalExam: String(form.elements.finalExam.value) + "%",
            type: form.elements.type.value
        }

        addCourse(formData)
    };

    /*
        addCourse creates a post request to the server, which adds a new course to the system.
    */
    async function addCourse(data) {
        try {
          const res = await fetch("/courses/add", {
            method: "POST",
            headers: {
                token: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          setShow(false);
          refreshTable();
          notifyAdded(data.courseCode + " Added!");

          const status = await res.statusText;
          
        } catch (err) {
          console.error(err.message);
        }
    }

    return (
        <>
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="courseCode">
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>

                <Form.Group controlId="courseTitle">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="credits">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control required as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control required as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control required as="select">
                            <option>I</option>
                            <option>II</option>
                            <option>III</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="coursework">
                        <Form.Label>Coursework</Form.Label>
                        <Form.Control required type="number" min="1" max="100" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="finalExam">
                        <Form.Label>Final Exam</Form.Label>
                        <Form.Control required type="number" min="1" max="100" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control required as="select">
                            <option>Core</option>
                            <option>Elective</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="prerequisites">
                    <Form.Label>Prerequisites</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows={3}/>
                </Form.Group>

                <div class="float-right"><Button type="submit" class="btn btn-custom">Submit</Button></div>
            </Form>

            <ToastContainer 
                pauseOnHover
                position="bottom-right"
            />
        </>
    );
}

export default AddCourse;