import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    SetAdvisingWindow is a component that is used to set the current advising window on the system.
*/
function SetAdvisingWindow() {
    /*
        notifyEdit and notifyError  is used to display a toast notifications for events.
        notifyEdit displays a green toast and notifyError displays a red toast.
    */    
    const notifyEdit = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    /*
        The validated state is used to keep track of the validity of the set advising window  form.
        It's initial state is false.
    */
    const [validated, setValidated] = useState(false);

    /*
        The advisingStare and advisingEnd states store when the current advising window starts and end.
    */   
    const [advisingStart, setadvisingStart] = useState(new Date());
    const [advisingEnd, setadvisingEnd] = useState(new Date());

    /*
        HandleSubmit gets the data from the form, checks to see if it is valid, and passes it to the setWindow function.
    */    
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        event.preventDefault();
        event.stopPropagation();
        

        const formData = {
            advisingStart : form.elements.advisingStart.value,
            advisingEnd : form.elements.advisingEnd.value,
            semester : form.elements.semester.value
        }

        if(advisingStart > advisingEnd){
            notifyError("Error, Start Date After End Date");
        } else {
            setValidated(true);
            setWindow(formData);
        }
    };

    /*
        setWindow creates a post request to the server, which sets the advising window.
    */
    async function setWindow(data) {
        try {
          const res = await fetch("/admin/academic-advising/window", {
            method: "POST",
            headers: {
                token: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const status = await res.statusText;
          notifyEdit("Advising Window Updated!");
          
        } catch (err) {
          console.error(err.message);
        }
    }

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

                <Form.Group controlId="semester">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control required as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </Form.Group>

                <div class="float-right"><Button type="submit" class="btn btn-custom">Save</Button></div>
            </Form>

            <ToastContainer 
                pauseOnHover
                position="bottom-right"
            />
        </>
    );
}

export default SetAdvisingWindow;