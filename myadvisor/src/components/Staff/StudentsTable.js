import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Modal, Tabs, Tab } from "react-bootstrap";

//TABLE SETUP

/*
    columns, coursesColumns and inprogressCoursesColumns are used to display specific columns of the data on the tables.
*/
const columns = [
    { dataField: 'studentId', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'gpa', text: 'GPA', csvText: 'GPA', sort: true },
    { dataField: 'degree', text: 'Degree', csvText: 'Degree', sort: true },
    { dataField: 'credits', text: 'Credits', csvText: 'Credits', sort: true },
]

const coursesColumns = [
    { dataField: 'courseCode', text: 'Course Code', sort: true },
    { dataField: 'courseTitle', text: 'Course Title', sort: true },
    { dataField: 'grade', text: 'Grade', sort: true },
]

const inprogressCoursesColumns = [
    { dataField: 'courseCode', text: 'Course Code', sort: true },
    { dataField: 'courseTitle', text: 'Course Title', sort: true },
]

/*
    defaultSorted sorts the table is ascending order based on the name column.
*/
const defaultSorted = [{
    dataField: 'name',
    order: 'asec'
}];

/*
    options and courseOptions is used to configure the table pagination.
*/
const options = {
    custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    sizePerPage: 8,
};

const courseOptions = {
    sizePerPage: 8,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
};

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

/*
    StudentsTable is a component that displays the students in the system in a table.
*/
function StudentsTable({students, loading}) {
    /*
        The show state is used to keep track of the visibility of the student details modal.
        It's initial state is false.
        handleShow sets the show state to true, which displays the modal.
        handleShow sets the show state to false, which closes the modal.
    */ 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*
        The studentName state is used to store the currently selected student's name.
        The studentCourses state is used to store the currently selected student's courses.
        The completedCourses state is used to store the currently selected student's completed courses.
        The inprogressCourses state is used to store the currently selected student's inprogress courses.        
    */ 
    const [studentName, setStudentName] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [inprogressCourses, setInprogressCourses] = useState([]);

    /*
        rowEvents is used to get the currently selected student's name and store it in the studentName state.
        It also gets the courses of that student.
    */
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setStudentName(row.name);
            getStudentCourses(row.studentId);
        }
    };

    /*
        getStudentCourses creates a get request to the server that gets all the courses of this specified student.
        It also used the getCompleted and getInprogress functions to separate the courses based on if they are inprogress or completed.
    */
    async function getStudentCourses(studentId) {
        try {
            const res = await fetch("/transcript/courses/viewAll/" + studentId, {
            method: "GET",
        });
            const parseData = await res.json();
            setStudentCourses(parseData);
            getCompleted(parseData);
            getInprogress(parseData);
            setShow(true);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    function getCompleted(data){
        let arr = []

        for (var key in data){
            if(data[key].grade != 'IP'){
                arr.push(data[key])
            }
        }

        setCompletedCourses(arr);
    }

    function getInprogress(data){
        let arr = []

        for (var key in data){
            if(data[key].grade == 'IP'){
                arr.push(data[key])
            }
        }

        setInprogressCourses(arr);
    }

    useEffect(() => {
        getStudentCourses();
    }, []);   
     

    /*
        ToolkitProvider is a wrapper for the BootstrapTable context and the related search, export csv and clear search react contexts.  
    */ 
    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="studentID"
                    data={ students }
                    columns={ columns }
                    search
                    exportCSV={{
                        fileName: 'students.csv',
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted } rowEvents={ rowEvents } hover/>
                    </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
        </>
    );

    return (
        <>
            {loading ? (
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            ) : (
            <PaginationProvider pagination={paginationFactory(options)}>
                { table }
            </PaginationProvider>
            )}

            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>{studentName}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Tabs defaultActiveKey="completed" id="uncontrolled-tab-example">
                    <Tab eventKey="completed" title="Completed">
                        <ToolkitProvider
                        keyField="courseCode"
                        data={ completedCourses }
                        columns={ coursesColumns }
                        search
                        >
                        {
                            props => (
                            <div>
                                <br/>
                                <SearchBar { ...props.searchProps } />
                                <BootstrapTable
                                { ...props.baseProps } pagination={ paginationFactory(courseOptions) } hover
                                />
                            </div>
                            )
                        }
                        </ToolkitProvider>                           
                    </Tab>
                    <Tab eventKey="incomplete" title="Inprogress">
                        <ToolkitProvider
                        keyField="courseCode"
                        data={ inprogressCourses }
                        columns={ inprogressCoursesColumns }
                        search
                        >
                        {
                            props => (
                            <div>
                                <br/>
                                <SearchBar { ...props.searchProps } />
                                <BootstrapTable
                                { ...props.baseProps } pagination={ paginationFactory(courseOptions) } hover
                                />
                            </div>
                            )
                        }
                        </ToolkitProvider>  
                    </Tab>
                </Tabs>
              </Modal.Body>
          </Modal>            
        </>
    );
}

export default StudentsTable;

