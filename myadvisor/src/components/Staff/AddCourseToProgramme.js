import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PullProgrammes from "../PullProgrammes";
import PullCourses from "../PullCourses";

/*
    AddCourseToProgramme allows a staff member to add offered courses to a programme in the system.
*/

function AddCourseToProgramme({setShowAddCourseProg, refreshTable}) {
    /*
        The validated state is used to keep track of the validity of the add course to programme form.
        It's initial state is false.
    */    
        const [validated, setValidated] = useState(false);

        const [programme, setProgramme] = useState("None"); // Store which programme was selected
        const [course, setCourse] = useState("None"); // Store which course was selected

        var programmes = PullProgrammes(); // Get all degree programmes from the database
        var courses = PullCourses(); // Get all degree courses from the database
        //console.log(programmes)

        
            
            
        

        /*
            notifyAdded is used to display toast notifications for events. It displays a green toast.
        */    
        const notifyAdded = (text) => toast.success(text);
    
        /*
            notifyNotAdded is used to display toast notifications for events. It displays a red toast.
        */    
            const notifyNotAdded = (text) => toast.error(text);

        /*
        HandleSubmit gets the data from the form as passes it to the addCourseToProgramme function.
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

            const programmeName = form.elements.programmename.value;//get programme name from the form
            const courseFullName = form.elements.coursefullname.value;//get the course full name from the form
            const courseType = form.elements.coursetype.value;

            //To get the programmeID of the selected programme
            const programmeFound = programmes.find(p => {
                return p.name === programmeName;
            })
            const programmeId = programmeFound.id;

            //To get the courseID of the selected course
            const courseFound = courses.find(c => {
                const cFullName = c.courseCode + " " + c.courseTitle;
                return cFullName === courseFullName;
            })
            const courseId = courseFound.id;
            
            const formData = {
                programmeID : programmeId,
                courseID : courseId,
                type: courseType
            }
            addCourseToProgramme(formData);
        };

        /*
            addCourseToProgramme creates a post request to the server, which adds a new course to a programme in the system.
        */
        async function addCourseToProgramme(data) {
            try {
              const res = await fetch("/programmes/add/" + data.programmeID + "/" + data.courseID, {
                method: "POST",
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
              });
        
              setShowAddCourseProg(false);
              refreshTable();

              const status = await res.statusText;

              if(res.status==401){
                notifyNotAdded("Course Already Added to Programme!");
              }
              else{
                if(res.status===200){
                    notifyAdded("Course Added to Programme!");
                }
              }
                
            } catch (err) {
              console.error(err.message);
            }
            
        }

        return (<>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="programmename">
                        <Form.Label>Select Programme</Form.Label>
                            <Form.Control required as="select">
                                <option value="None">Choose a programme</option>
                                {
                                    Array.from({length: programmes.length}, (_, k) => {
                                        return <option value={programmes[k].name}>{programmes[k].name}</option> 
                                    })
                                }
                                
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="coursefullname">
                        <Form.Label>Select Course</Form.Label>
                            <Form.Control required as="select">
                                <option value="None">Choose a course</option>
                                {
                                    Array.from({length: courses.length}, (_, j) => {
                                        return <option value={courses[j].courseCode + " " + courses[j].courseTitle}>{courses[j].courseCode + " " + courses[j].courseTitle}</option> 
                                    })
                                }
                            </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId="coursetype">
                        <Form.Label>Select Type</Form.Label>
                            <Form.Control required as="select">
                            <option value="None">Choose type</option>
                                <option>Core</option>
                                <option>Elective</option>
                            </Form.Control>
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

export default AddCourseToProgramme;