import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Modal, Button } from "react-bootstrap";
import EditCourse from "./EditCourse";
import "../../assets/css/Staff.css";

//TABLE SETUP

const columns = [
    { dataField: 'courseCode', text: 'Course Code', csvText: 'Course Code', sort: true },
    { dataField: 'courseTitle', text: 'Course Title', csvText: 'Course Title' },
    { dataField: 'credits', text: 'Credits', csvText: 'Credits', sort: true },
    { dataField: 'semester', text: 'Semester', csvText: 'Semester', sort: true },
]

const defaultSorted = [{
  dataField: 'courseCode',
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

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

function CoursesTable({courses, loading, refreshTable, confirmDelete}) {

    //Edit Course Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [row, setRow] = useState();

    //REQUESTS

    function eCourse(row) {
      setShow(true);
      setRow(row);
    }

    function dCourse(courseCode) {
      confirmDelete(courseCode);
    }

    //EXPANDED TABLE ROW

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

            <div class="btn-group">
              <button type="button" class="btn btn-custom edit-course" onClick={() => eCourse(row)}>Edit</button>
              <button type="button" class="btn btn-danger delete-course" onClick={() => dCourse(row.courseCode)}>Delete</button>
            </div>
          </div>
        )
    };

    //TABLE

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
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } expandRow={ expandRow } defaultSorted={ defaultSorted }/>
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