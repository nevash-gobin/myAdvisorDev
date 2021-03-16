import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SetAdvisingWindow() {
    const notifyEdit = (text) => toast.success(text);

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
            advisingStart : form.elements.advisingStart.value,
            advisingEnd : form.elements.advisingEnd.value,
            semester : "1"
        }

        setWindow(formData)
    };

    async function setWindow(data) {
        try {
          const res = await fetch("http://localhost:5000/admin/academic-advising/window", {
            method: "PUT",
            headers: {
                token: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const status = await res.statusText;
          
        } catch (err) {
          console.error(err.message);
        }
    }


    const [validated, setValidated] = useState(false);
    const [advisingStart, setadvisingStart] = useState(new Date());
    const [advisingEnd, setadvisingEnd] = useState(new Date());

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="advisingStart">
                    <Form.Label >Start Date</Form.Label>
                    <DatePicker required selected={advisingStart} dateFormat="yyyy-MM-dd" onChange={date => setadvisingStart(date)} customInput={ <Form.Control required type="text" name="advisingStart" />}/>
                </Form.Group>

                <Form.Group controlId="advisingEnd">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker required selected={advisingEnd} dateFormat="yyyy-MM-dd" onChange={date => setadvisingEnd(date)} customInput={ <Form.Control required type="text" name="advisingEnd" />}/>
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

export default SetAdvisingWindow;