import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
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

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

function CoursesTable() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    //REQUESTS

    async function getCourses() {
      try {
        const res = await fetch("http://localhost:5000/courses/all", {
          method: "GET",
        });
  
        const parseData = await res.json();
        setCourses(parseData);
        setLoading(true);
        
      } catch (err) {
        console.error(err.message);
      }
    }

    function editCourse(courseCode) {
      alert(courseCode)
    }

    function deleteCourse(courseCode) {
      alert(courseCode)
    }

    useEffect(() => {
      getCourses();
    }, []);

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

            <button type="button" class="btn btn-primary edit-course" onClick={() => editCourse(row.courseCode)}>Edit</button>
            <button type="button" class="btn btn-danger delete-course" onClick={() => deleteCourse(row.courseCode)}>Delete</button>
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
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } expandRow={ expandRow } defaultSorted={ defaultSorted }/>
                    </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
        </>
  );

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

  return (
      <>
          {loading ? (
            <PaginationProvider pagination={paginationFactory(options)}>
              { table }
            </PaginationProvider>
          ) : (
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
        
      </>

  );
}

export default CoursesTable;