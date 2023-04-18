import React, { useEffect, useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NUMERIC } from "sequelize";

/*
    EditCourse allows staff to edit courses on the system.
*/

function EditCourse({setShow, row, refreshTable}) {
    /*
        The validated state is used to keep track of the validity of the editCourse form.
        It's initial state is false.
    */    
    const [validated, setValidated] = useState(false);

    /*
        The checkBoxState array is used to keep track of the checked state of the checkboxes.
        It's initial state is false.
    */    
    const [checkBoxStateSubmit, setCheckBoxStateSubmit] = useState(new Array(17).fill(false));
    const [checkBoxStateExist, setCheckBoxStateExist] = useState(new Array(17).fill(false));

    const assessments = ["coursework", "finalExam", "groupProject", "individualWork", "practicalCoursework", "courseworkExam", 
                             "projectPres", "project", "presentation", "assignment", "labAssessment", "midSemesterMcq", 
                             "projectReport", "projectReportPres", "projectAndPres", "performanceReports", "projectSoftwareApp"];

    //get existing checkbox state
    for(var j=0; j<assessments.length; j++){
        //if(row[assessments[j]] === "%"){
            //checkBoxStateExist[j] = false;
        //}
        if(row[assessments[j]]!=null){
            checkBoxStateExist[j] = true;
        }
        else{
            checkBoxStateExist[j] = false;
        }
    }
    useEffect(() => {
        setCheckBoxStateSubmit(checkBoxStateExist);
    }, [])
    
    //console.log(checkBoxStateExist);
    //console.log(checkBoxStateSubmit);

    /*
        notifyEdit is used to display toast notifications when the course is edited. It displays a green toast.
    */
    const notifyEdit = (text) => toast.success(text);

    /*
        HandleChange gets the checkboxes that were checked and stores them in an array.
    */    
        const handleChange = (event) => {
            //console.log(event.target.checked);
            //console.log("submit "+checkBoxStateSubmit);
            
            const updateCheckboxState = checkBoxStateSubmit.map((checkbox, count) => {
                if(count === parseInt(event.target.id)){
                    
                    //console.log(count);
                    //console.log(event.target.id);
                    return !checkbox;
                }
                else{
                    return checkbox;
                }
                
            });
            //console.log("update "+updateCheckboxState);
            //console.log("up "+updateCheckboxState);
            setCheckBoxStateSubmit(updateCheckboxState);
            //console.log(updateCheckboxState);
            //console.log(checkBoxState);
        };

    /*
        HandleSubmit gets the data from the form and passes it to the editCourse function.
    */    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        //console.log("current "+checkBoxStateSubmit);
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

        //console.log(formData);
        //console.log("submit "+checkBoxState);
        //Get the unselected assessments and set them to null
        for(var i=0; i<checkBoxStateSubmit.length; i++){
            if(checkBoxStateSubmit[i] === false){
                formData[assessments[i]] = null;
            }
        }

        editCourse(formData, row.courseCode);
    };

    /*
        editCourse creates a put request to the server, which edits the specified course.
    */    
    async function editCourse(data, code) {
        //console.log(JSON.stringify(data));
        try {
          const res = await fetch("/courses/edit/" + code, {
            method: "PUT",
            headers: {
                token: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
          //console.log(res);
    
          setShow(false);
          refreshTable();
          notifyEdit(data.courseCode + " Edited!")

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

    //get the number from the string percentage for assessments
    function getPercentNumFromString(text){
        if(text!=null){
            const array = text.split('%');
            const number = parseInt(array[0]);
            return number;
        }
        else{
            return text;
        }
    }

    //get default value for checkbox
    function getCheckboxState(text){
        //if(text === "%"){
            //return false;
        //}
        if(text!=null){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="courseCode">
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control required type="text" defaultValue={row.courseCode}/>
                </Form.Group>

                <Form.Group controlId="courseTitle">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control required type="text" defaultValue={row.courseTitle}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="credits">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control required as="select" defaultValue={row.credits}>
                            <option>3</option>
                            <option>6</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="semester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control required as="select" defaultValue={row.semester}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control required as="select" defaultValue={row.level}>
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
                            <Form.Check label="Coursework" id="0" name="Coursework" onChange={handleChange} defaultChecked={getCheckboxState(row.coursework)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.coursework)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="finalExam" className="form-inline">
                            <Form.Check label="Final Exam" id="1" name="Final Exam" onChange={handleChange} defaultChecked={getCheckboxState(row.finalExam)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.finalExam)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="groupProject" className="form-inline">
                            <Form.Check label="Group Project" id="2" name="Group Project" onChange={handleChange} defaultChecked={getCheckboxState(row.groupProject)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.groupProject)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="individualWork" className="form-inline">
                            <Form.Check label="Individual Work" id="3" name="Individual Work" onChange={handleChange} defaultChecked={getCheckboxState(row.individualWork)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.individualWork)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="practicalCoursework" className="form-inline">
                            <Form.Check label="Practical Coursework" id="4" name="Practical Coursework" onChange={handleChange} defaultChecked={getCheckboxState(row.practicalCoursework)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.practicalCoursework)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="courseworkExam" className="form-inline">
                            <Form.Check label="Coursework Exam" id="5" name="Coursework Exam" onChange={handleChange} defaultChecked={getCheckboxState(row.courseworkExam)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.courseworkExam)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectPres" className="form-inline">
                            <Form.Check label="Project Presentation" id="6" name="Project Presentation" onChange={handleChange} defaultChecked={getCheckboxState(row.projectPres)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.projectPres)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="project" className="form-inline">
                            <Form.Check label="Project" id="7" name="Project" onChange={handleChange} defaultChecked={getCheckboxState(row.project)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.project)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="presentation" className="form-inline">
                            <Form.Check label="Presentation" id="8" name="Presentation" onChange={handleChange} defaultChecked={getCheckboxState(row.presentation)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.presentation)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="assignment" className="form-inline">
                            <Form.Check label="Assignment" id="9" name="Assignment" onChange={handleChange} defaultChecked={getCheckboxState(row.assignment)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.assignment)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="labAssessment" className="form-inline">
                            <Form.Check label="Lab Assessment" id="10" name="Lab Assessment" onChange={handleChange} defaultChecked={getCheckboxState(row.labAssessment)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.labAssessment)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="midSemesterMcq" className="form-inline">
                            <Form.Check label="Mid Semester MCQ" id="11" name="Mid Semester MCQ" onChange={handleChange} defaultChecked={getCheckboxState(row.midSemesterMcq)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.midSemesterMcq)}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="projectReport" className="form-inline">
                            <Form.Check label="Project Report" id="12" name="Project Report" onChange={handleChange} defaultChecked={getCheckboxState(row.projectReport)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.projectReport)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectReportPres" className="form-inline">
                            <Form.Check label="Project Report and Presentation" id="13" name="Project Report and Presentation" onChange={handleChange} defaultChecked={getCheckboxState(row.projectReportPres)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.projectReportPres)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectAndPres" className="form-inline">
                            <Form.Check label="Project and Presentation" id="14" name="Project and Presentation" onChange={handleChange} defaultChecked={getCheckboxState(row.projectAndPres)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.projectAndPres)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="performanceReports" className="form-inline">
                            <Form.Check label="Performance Reports" id="15" name="Performance Reports" onChange={handleChange} defaultChecked={getCheckboxState(row.performanceReports)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.performanceReports)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projectSoftwareApp" className="form-inline">
                            <Form.Check label="Project or Software Application" id="16" name="Project or Software Application" onChange={handleChange} defaultChecked={getCheckboxState(row.projectSoftwareApp)} style={styleCheckbox}></Form.Check>
                            <Form.Control type="number" min="0" max="100" defaultValue={getPercentNumFromString(row.projectSoftwareApp)}/>
                        </Form.Group>

                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="prerequisites">
                    <Form.Label>Prerequisites</Form.Label>
                    <Form.Control required type="text" defaultValue={row.prerequisites}/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows={5} defaultValue={row.description}/>
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

export default EditCourse;