import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    AddProgramme allows a staff member to add programmes to the system.
*/

function AddProgramme({setShow, refreshTable}) {
    /*
        The validated state is used to keep track of the validity of the add programme form.
        It's initial state is false.
    */    
    const [validated, setValidated] = useState(false);

    /*
        notifyAdded is used to display toast notifications for events. It displays a green toast.
    */    
    const notifyAdded = (text) => toast.success(text);

    /*
        notifyNotAdded is used to display toast notifications for events. It displays a red toast.
    */    
        const notifyNotAdded = (text) => toast.error(text);

    /*
        HandleSubmit gets the data from the form as passes it to the addProgramme function.
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
                name : form.elements.name.value
            }
    
            addProgramme(formData)
        };
    
        /*
            addProgramme creates a post request to the server, which adds a new programme to the system.
        */
        async function addProgramme(data) {
            try {
              const res = await fetch("/programmes/add", {
                method: "POST",
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
              });
        
              setShow(false);
              refreshTable();

              const status = await res.statusText;
              if(status=="Unauthorized"){
                notifyNotAdded(data.name + " Already Exists!");
              }
              else{
                notifyAdded(data.name + " Added!");
              }
              
            } catch (err) {
              console.error(err.message);
            }
        }
    
        return (
            <>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text"/>
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

export default AddProgramme;