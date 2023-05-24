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
        The checkBoxState array is used to keep track of the checked state of the checkboxes.
        It's initial state is false.
    */    
        const [checkBoxState, setCheckBoxState] = useState(new Array(17).fill(false));

        const assessments = ["coursework", "finalExam", "groupProject", "individualWork", "practicalCoursework", "courseworkExam", 
                             "projectPres", "project", "presentation", "assignment", "labAssessment", "midSemesterMcq", 
                             "projectReport", "projectReportPres", "projectAndPres", "performanceReports", "projectSoftwareApp"];
                            
    /*
        notifyAdded is used to display toast notifications for events. It displays a green toast.
    */    
    const notifyAdded = (text) => toast.success(text);

    /*
        notifyNotAdded is used to display toast notifications for events. It displays a red toast.
    */    
    const notifyNotAdded = (text) => toast.error(text);

    /*
        HandleChange gets the checkboxes that were checked and stores them in an array.
    */    
        const handleChange = (event) => {

            const updateCheckboxState = checkBoxState.map((checkbox, count) => {
                if(count === parseInt(event.target.id)){
                    return !checkbox;
                }
                else{
                    return checkbox;
                }
            });

            setCheckBoxState(updateCheckboxState);
        };

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
            prerequisites : form.elements.prerequisites.value,
            description: form.elements.description.value,
            coursework: String(form.elements.coursework.value) + "%",
            finalExam: String(form.elements.finalExam.value) + "%",
            groupProject: String(form.elements.groupProject.value) + "%",
            individualWork: String(form.elements.individualWork.value) + "%",
            practicalCoursework: String(form.elements.practicalCoursework.value) + "%",
            courseworkExam: String(form.elements.courseworkExam.value) + "%",
            projectPres: String(form.elements.projectPres.value) + "%",
            project: String(form.elements.project.value) + "%",
            presentation: String(form.elements.presentation.value) + "%",
            assignment: String(form.elements.assignment.value) + "%",
            labAssessment: String(form.elements.labAssessment.value) + "%",
            midSemesterMcq: String(form.elements.midSemesterMcq.value) + "%",
            projectReport: String(form.elements.projectReport.value) + "%",
            projectReportPres: String(form.elements.projectReportPres.value) + "%",
            projectAndPres: String(form.elements.projectAndPres.value) + "%",
            performanceReports: String(form.elements.performanceReports.value) + "%",
            projectSoftwareApp: String(form.elements.projectSoftwareApp.value) + "%"
        }
        
        
        //Get the unselected assessments and set them to null
        for(var i=0; i<checkBoxState.length; i++){
            if(checkBoxState[i] === false){
                formData[assessments[i]] = null;
            }

            //if(checkBoxState[i] === true){//if checkbox is checked
                //add elements to the formData
                //formData[assessments[i]] = String(form.elements[assessments[i]].value) + "%"; 
            //}
        }
        addCourse(formData);
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
                    <Form.Group as={Col} md="4" controlId="credits">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control required as="select">
                            <option>3</option>
                            <option>6</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control required as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control required as="select">
                            <option>I</option>
                            <option>II</option>
                            <option>III</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="assessment">
                        <Form.Label>Assessments</Form.Label>

                        <Form.Group as={Col} controlId="coursework" className="form-inline">
                            <Form.Check label="Coursework" id="0" name="Coursework" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="finalExam" className="form-inline">
                            <Form.Check label="Final Exam" id="1" name="Final Exam" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="groupProject" className="form-inline">
                            <Form.Check label="Group Project" id="2" name="Group Project" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="individualWork" className="form-inline">
                            <Form.Check label="Individual Work" id="3" name="Individual Work" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="practicalCoursework" className="form-inline">
                            <Form.Check label="Practical Coursework" id="4" name="Practical Coursework" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="courseworkExam" className="form-inline">
                            <Form.Check label="Coursework Exam" id="5" name="Coursework Exam" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectPres" className="form-inline">
                            <Form.Check label="Project Presentation" id="6" name="Project Presentation" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="project" className="form-inline">
                            <Form.Check label="Project" id="7" name="Project" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="presentation" className="form-inline">
                            <Form.Check label="Presentation" id="8" name="Presentation" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="assignment" className="form-inline">
                            <Form.Check label="Assignment" id="9" name="Assignment" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="labAssessment" className="form-inline">
                            <Form.Check label="Lab Assessment" id="10" name="Lab Assessment" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="midSemesterMcq" className="form-inline">
                            <Form.Check label="Mid Semester MCQ" id="11" name="Mid Semester MCQ" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectReport" className="form-inline">
                            <Form.Check label="Project Report" id="12" name="Project Report" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectReportPres" className="form-inline">
                            <Form.Check label="Project Report and Presentation" id="13" name="Project Report and Presentation" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectAndPres" className="form-inline">
                            <Form.Check label="Project and Presentation" id="14" name="Project and Presentation" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="performanceReports" className="form-inline">
                            <Form.Check label="Performance Reports" id="15" name="Performance Reports" onChange={handleChange} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectSoftwareApp" className="form-inline">
                            <Form.Check label="Project or Software Application" id="16" name="Project or Software Application" onChange={handleChange} style={styleCheckbox}></Form.Check>
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