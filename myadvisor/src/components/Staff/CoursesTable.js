import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Modal, Button } from "react-bootstrap";
import EditCourse from "./EditCourse";
import "../../assets/css/Staff.css";

//TABLE SETUP

/*
    columns is used to display specific columns of the data on the table.
*/
const columns = [
  { dataField: 'courseCode', text: 'Course Code', csvText: 'Course Code', sort: true },
  { dataField: 'courseTitle', text: 'Course Title', csvText: 'Course Title' },
  { dataField: 'credits', text: 'Credits', csvText: 'Credits', sort: true },
  { dataField: 'semester', text: 'Semester', csvText: 'Semester', sort: true },
]

/*
    defaultSorted sorts the table is ascending order based on the courseCode column.
*/
const defaultSorted = [{
  dataField: 'courseCode',
  order: 'asec'
}];

/*
    options is used to configure the table pagination.
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

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

/*
    CoursesTable is a component that displays the courses in the system in a table.
*/
function CoursesTable({courses, loading, refreshTable, confirmDelete}) {

    /*
        The show state is used to keep track of the visibility of the editCourses modal.
        It's initial state is false.
        handleShow sets the show state to true, which displays the modal.
        handleClose sets the show state to false, which closes the modal.
    */ 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*
        The row state is used to keep track of which row is currently expanded on the table
    */    
    const [row, setRow] = useState();

    /*
        eCourse is used to set the row state and open the editCourse modal.
    */ 
    function eCourse(row) {
      setShow(true);
      setRow(row);
    }

    /*
        dCourse is used to show show the confirmDelete course modal.
    */ 
    function dCourse(courseCode) {
      confirmDelete(courseCode);
    }

    /*
        expandRow is used to display extra information on the course of the selected row.
        It also contains the buttons that allow the user to edit and delete the course.
    */ 
    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
          <div>
            <h3>{ `${row.courseCode}` } - { `${row.courseTitle}` }</h3>
            <br/>
            <h4>Description</h4>
            <p>{ `${row.description}` }</p>

            <h4>Prerequisites</h4>
            <p>{ `${row.prerequisites}` }</p>

            <h4>Coursework</h4>
            <p>{ `${row.coursework}` }</p>

            <h4>Final Exam</h4>
            <p>{ `${row.finalExam}` }</p>

            <div class="btn-group">
              <button type="button" class="btn btn-custom edit-course" onClick={() => eCourse(row)}>Edit</button>
              <button type="button" class="btn btn-danger delete-course" onClick={() => dCourse(row.courseCode)}>Delete</button>
            </div>
          </div>
        )
    };

    /*
        ToolkitProvider is a wrapper for the BootstrapTable context and the related search, export csv and clear search react contexts.  
    */ 

    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="courseCode"
                    data={ courses }
                    columns={ columns }
                    search
                    exportCSV={{
                      fileName: 'courses.csv',
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } expandRow={ expandRow } defaultSorted={ defaultSorted } hover/>
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
                  <Modal.Title>Edit Course</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <EditCourse setShow={setShow} row={row} refreshTable={refreshTable}/>
              </Modal.Body>
          </Modal>
        
      </>

  );
}

export default CoursesTable;