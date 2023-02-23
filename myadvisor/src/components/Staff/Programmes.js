import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ProgrammesTable from './ProgrammesTable';
import AddProgramme from "./AddProgramme";
import AddCourseToProgramme from "./AddCourseToProgramme";
import {Jumbotron, Container} from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

/*
    Programmes is a component that displays the programmes table.
*/
function Programmes() {
    /*
        The show state is used to keep track of the visibility of the addProgrammes modal.
        It's initial state is false.
        handleShow sets the show state to true, which displays the modal.
        handleClose sets the show state to false, which closes the modal.
    */ 
        const [show, setShow] = useState(false);
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);

    /*
        The showAddCourseProg state is used to keep track of the visibility of the addCourseToProgramme modal.
        It's initial state is false.
        handleShowCourses sets the show state to true, which displays the modal.
        handleCloseCourses sets the show state to false, which closes the modal.
    */ 
        const [showAddCourseProg, setShowAddCourseProg] = useState(false);
        const handleShowCourses = () => setShowAddCourseProg(true);
        const handleCloseCourses = () => setShowAddCourseProg(false);

    /*
        The programmes state is used store all the programmes that will be displayed in the table.
        The loading state is used to keep track of getting the programmes from the server. 
        It's initial state is true, so the table will not be displayed until the system has fetched all programmes.
    */ 
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        notifyDelete is used to display a toast notifications when a programme is deleted. It displays a red toast.
    */
        const notifyDelete = (text) => toast.error(text);

    /*
        getProgrammes creates a get request to the server that gets all the programmes on the system and stores it in the programmes state.
    */
    async function getProgrammes() {
        try {
            const res = await fetch("/programmes/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setProgrammes(parseData);
            setLoading(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProgrammes();
    }, []);

    /*
        refreshTable sets the loading state to true and gets the programmes from the system.
    */
    function refreshTable(){
        setLoading(true);
        getProgrammes();
    }
    
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Programmes</h2>
                </Container>
            </Jumbotron>        
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <ProgrammesTable programmes={programmes} loading={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course" onClick={handleShow}>Add Programme</button>
                        <button type="button" class="btn btn-custom add-course" onClick={handleShowCourses} style={{marginTop: 5}} >Add Course to Programme</button>
                    </div>

                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add Programme</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <AddProgramme setShow={setShow} refreshTable={refreshTable}/>
                        </Modal.Body>
                    </Modal>

                    
                    <Modal show={showAddCourseProg} onHide={handleCloseCourses} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add Course to Programme</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <AddCourseToProgramme setShowAddCourseProg={setShowAddCourseProg} refreshTable={refreshTable}/>
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

export default Programmes;