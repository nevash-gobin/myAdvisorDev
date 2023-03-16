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
        notifyNotAdded is used to display toast notifications for events. It displays a red toast.
    */    
    const notifyNotAdded = (text) => toast.error(text);

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
            type: form.elements.type.value,
            coursework: String(form.elements.coursework.value) + "%",
            finalExam: String(form.elements.finalExam.value) + "%",
            groupProject: String(form.elements.groupProject.value) + "%",
            prerequisites : form.elements.prerequisites.value,
            description: form.elements.description.value,
            
        }
        console.log(formData);
        //addCourse(formData)
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

          if(res.status===401){
            notifyNotAdded(data.courseCode + " Already Exists!");
          }
          else{
                if(res.status===200){
                    notifyAdded(data.courseCode + " Added!");
                }
          }

          const status = await res.statusText;
          
        } catch (err) {
          console.error(err.message);
        }
    }

        const styleCheckbox = {
            marginTop: "10px",
            marginLeft: "20px",
            marginRight: "10px"
        };
    
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
                    <Form.Group as={Col} md="3" controlId="credits">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control required as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control required as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control required as="select">
                            <option>I</option>
                            <option>II</option>
                            <option>III</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control required as="select">
                            <option>Core</option>
                            <option>Elective</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="assessment">
                        <Form.Label>Assessments</Form.Label>

                        <Form.Group as={Col} controlId="coursework" className="form-inline">
                            <Form.Check label="Coursework" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="finalExam" className="form-inline">
                            <Form.Check label="Final Exam" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="groupProject" className="form-inline">
                            <Form.Check label="Group Project" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="individualWork" className="form-inline">
                            <Form.Check label="Individual Work" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="practicalCw" className="form-inline">
                            <Form.Check label="Practical Coursework" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="cwExam" className="form-inline">
                            <Form.Check label="Coursework Exam" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectPres" className="form-inline">
                            <Form.Check label="Project Presentation" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="project" className="form-inline">
                            <Form.Check label="Project" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="presentation" className="form-inline">
                            <Form.Check label="Presentation" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="assignment" className="form-inline">
                            <Form.Check label="Assignment" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="labAssessment" className="form-inline">
                            <Form.Check label="Lab Assessment" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="midSemMcq" className="form-inline">
                            <Form.Check label="Mid Semester MCQ" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectReport" className="form-inline">
                            <Form.Check label="Project Report" style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

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