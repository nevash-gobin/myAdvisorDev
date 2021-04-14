import React, { useState, useRef } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    AddAccount allows a staff member to add staff and student accounts to the system.
*/

function AddAccount() {
    /*
        The validated state is used to keep track of the validity of the add account form.
        It's initial state is false.
    */
    const [validated, setValidated] = useState(false);

    /*
        formRef is is reference to the form, which allows for the resetting of the form.
    */
    const formRef = useRef(null);

    /*
        notifyError and notifyEdit is used to display toast notifications for events.
        notifyError displays a red toast and notifyEdit displays a green toast.
    */
    const notifyError = (text) => toast.error(text);
    const notifyEdit = (text) => toast.success(text);

    /*
        HandleSubmit gets the data from the form, checks to see if it is valid, and passes it to the addAccount function.
    */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const url = "";

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else{

            event.preventDefault();
            event.stopPropagation();
        
            const formData = {
                username : form.elements.username.value,
                password : form.elements.password.value,
                confirm_password : form.elements.confirm_password.value,
                account_type: form.elements.account_type.value
            }

            if(formData.password != formData.confirm_password){
                notifyError("Passwords Don't Match")
            } else {

                if(formData.account_type == "Staff"){
                    addAccount(formData, "/admin/staff/create"); 
                } else if(formData.account_type == "Student") {
                    addAccount(formData, "/admin/students/create"); 
                }

                setValidated(true);

                formRef.current.reset();
                setValidated(false);
            }
        }
    };

    /*
        addAccount creates a post request to the server, which creates a new account based on the account type selected.
    */
    async function addAccount(data, url) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
                token: localStorage.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const status = await res.statusText;

          if(status == "OK"){
            notifyEdit("Account Added!");
          }
          else{
            notifyError("Error, Account Already Exists.");
          }

        } catch (err) {
            notifyError(err.message);
        }
    }

    return (
        <>
            <Form ref={formRef} validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="account_type">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control as="select">
                    <option>Staff</option>
                    <option>Student</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="confirm_password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>
                    </Col>
                </Form.Row>
 
                <div class="float-right"><Button type="submit" class="btn btn-custom">Add</Button></div>
            </Form>

        </> 
    );
}

export default AddAccount;