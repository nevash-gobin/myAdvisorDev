import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Modal, Tabs, Tab } from "react-bootstrap";

//TABLE SETUP

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

const defaultSorted = [{
    dataField: 'name',
    order: 'asec'
}];

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

function StudentsTable({students, loading}) {
    //Modal
    const [show, setShow] = useState(false);
    const [studentName, setStudentName] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [inprogressCourses, setInprogressCourses] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setStudentName(row.name);
            getStudentCourses(row.studentId);
        }
    };

    //Get Student Courses
    async function getStudentCourses(studentId) {
        try {
            const res = await fetch("http://localhost:5000/transcript/courses/viewAll/" + studentId, {
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

    //TABLE
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

