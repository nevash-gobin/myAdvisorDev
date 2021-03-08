import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse({setShow, refreshTable}) {
    const [validated, setValidated] = useState(false);

    //Toast
    const notifyAdded = (text) => toast.success(text);

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
            description: form.elements.description.value
        }

        addCourse(formData)
    };


    async function addCourse(data) {
        try {
          const res = await fetch("http://localhost:5000/courses/add", {
            method: "POST",
            headers: {
                token: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          setShow(false);
          refreshTable();
          notifyAdded(data.courseCode + " Added!")

          const status = await res.statusText;
          
        } catch (err) {
          console.error(err.message);
        }
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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