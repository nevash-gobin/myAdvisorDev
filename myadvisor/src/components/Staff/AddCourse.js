import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

function AddCourse({setShow, refreshTable}) {
    const [validated, setValidated] = useState(false);

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
            courseCode : form.elements.courseCode.value,
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
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiI4MTYwMTQ5MjQiLCJpYXQiOjE2MTQ0NjY4MTIsImV4cCI6MTYxNDU1MzIxMn0.uH77uW4WO6zi4Itd2WYXynxS_wDMZm3WcCBRQPgZRpE",
                "Content-type": "application/json",
              },
            body: JSON.stringify(data),
          });
    
          setShow(false);
          refreshTable();

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
                        <Form.Control required type="number" min="1"/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control required type="number" min="1"/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control required type="text"/>
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

                <div class="float-right"><Button type="submit" >Submit</Button></div>
            </Form>
        </>
    );
}

export default AddCourse;