import React, { useState, useRef } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    DeleteProgramme allows a staff member to delete programmes from the system.
*/

function DeleteProgramme({setLoading, setShowDeleteProg, programmes, refreshTable}) {
    const progs = programmes.sort((a, b) => (a.name < b.name ? -1 : 1));//sort in ascending order by name
            
    /*
        The validated state is used to keep track of the validity of the delete programme form.
        It's initial state is false.
    */    
    const [validated, setValidated] = useState(false);

    /*
        The checkBoxState array is used to keep track of the checked state of the checkboxes.
        It's initial state is false.
    */    
    const [checkBoxState, setCheckBoxState] = useState(new Array(progs.length).fill(false));

    /*
        notifyAdded is used to display toast notifications for events. It displays a green toast.
    */    
    const notifyDeleted = (text) => toast.success(text);

    /*
        notifyNotAdded is used to display toast notifications for events. It displays a red toast.
    */    
        const notifyNotDeleted = (text) => toast.error(text);

    /*
        HandleChange gets the checkboxes that were checked and stores them in an array.
    */    
        const handleChange = (event, index) => {

            const updateCheckboxState = checkBoxState.map((checkbox, count) => {
                if(count === index){
                    return !checkbox;
                }
                else{
                    return checkbox;
                }
            });
            setCheckBoxState(updateCheckboxState);
        };

    /*
        HandleSubmit gets the data from the form as passes it to the deleteProgramme function.
    */    
        const handleSubmit = (event) => {
            //const selectedProgrammes = [];
            
            const form = event.currentTarget;
    
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
    
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

            //Get the selected programmes and store them in an array
            for(var i=0; i<checkBoxState.length; i++){
                if(checkBoxState[i] === true){
                    const programmeObject = {
                        id: progs[i].id,
                        name: progs[i].name
                    };
                    //selectedProgrammes.push(programmeObject);
                    deleteProgramme(programmeObject);
                }
            }
        };
    
        /*
            deleteProgramme creates a post request to the server, which deletes a programme from the system.
        */
        async function deleteProgramme(data) {
            try {
              const res = await fetch("/programmes/delete/" + data.name, {
                method: "DELETE",
                headers: {
                    token: localStorage.getItem("token"),
                    //"Content-type": "application/json",
                },
                body: JSON.stringify(data),
              });
        
              setShowDeleteProg(false);
              setLoading(false);
              refreshTable();

              const status = await res.statusText;

              if(res.status==401){
                notifyNotDeleted(data.name + " not deleted!");
              }
              else{
                if(res.status===200){
                    notifyDeleted(data.name + " Deleted!");
                }
              }
            } catch (err) {
              console.error(err.message);
            }
        }
    
        return (
            <>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Choose Programme</Form.Label>
                        {progs.map((programme, indexNum) => (
                            
                            <Form.Check 
                                label={programme.name}
                                name={programme.name}
                                onChange={event => handleChange(event, indexNum)}
                                style={{margin:5, marginTop:10}}
                            />
                        ))}
                    </Form.Group>
    
                    <div class="float-right"><Button type="submit" class="btn btn-custom">Delete</Button></div>
                </Form>
    
                <ToastContainer 
                    pauseOnHover
                    position="bottom-right"
                />
            </>
        );
}

export default DeleteProgramme;