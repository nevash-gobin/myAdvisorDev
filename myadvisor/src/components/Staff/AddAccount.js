import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAccount() {
    const [validated, setValidated] = useState(false);
    const notifyError = (text) => toast.error(text);
    const notifyEdit = (text) => toast.success(text);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else{

            event.preventDefault();
            event.stopPropagation();
        
            const formData = {
                username : form.elements.username.value,
                password : form.elements.password.value,
                confirm_password : form.elements.confirm_password.value
            }

            if(formData.password != formData.confirm_password){
                notifyError("Passwords Don't Match")
            } else {
                
                setValidated(true);
                addAccount(formData);
                form.reset();
            }
        }
    };

    const options = {
        headers: { token: localStorage.token, "Content-Type": "application/json",}
    };

    async function addAccount(data) {
        try {
          const res = await fetch("/admin/staff/create", {
            method: "POST",
            headers: {
                token: localStorage.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const status = await res.statusText;

          if(status == "OK"){
            notifyEdit("Staff Added!");
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
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required/>
                </Form.Group>

                <Form.Group controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required/>
                </Form.Group>

                <div class="float-right"><Button type="submit" class="btn btn-custom">Add</Button></div>
            </Form>

        </> 
    );
}

export default AddAccount;