import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter  } from 'react-bootstrap-table2-filter';
import { Modal, Tabs, Tab } from "react-bootstrap";

const columns = [
    { dataField: 'name', text: 'Programme', csvText: 'name', sort: true },
]

const selectLevelOptions = {
    I: 'I',
    II: 'II',
    III: 'III'
};

const selectSemesterOptions = {
    1: '1',
    2: '2',
    3: '3'
};

const coursesColumns = [
    { 
        dataField: 'level', 
        text: 'Level', 
        sort: true,
        formatter: cell => selectLevelOptions[cell],
        filter: selectFilter({
            options: selectLevelOptions,
        })
    },
    { 
        dataField: 'semester', 
        text: 'Semester', 
        sort: true,
        formatter: cell => selectSemesterOptions[cell],
        filter: selectFilter({
            options: selectSemesterOptions,
        })
    },
    { dataField: 'courseCode', text: 'Course Code', sort: true },
    { dataField: 'courseTitle', text: 'Course Title', sort: true },
]

const defaultSorted = [{
    dataField: 'name',
    order: 'asec'
}];

const coursesSorted = [{
    dataField: 'level',
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

function ProgrammesTable({programmes, loading}) {

    //Modal
    const [show, setShow] = useState(false);
    const [programmeName, setprogrammeName] = useState([]);
    const [programmeCourses, setProgrammeCourses] = useState([]);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setprogrammeName(row.name);
            getProgrammeCourses(row.id);
        }
    };    

    //Get Programme Courses
    async function getProgrammeCourses(id) {
        try {
            setShow(true);
            setProgrammeCourses([]);
            setLoadingCourses(true);

            const res = await fetch("http://localhost:5000/programmes/offered-courses/" + id, {
            method: "GET",
        });
            const parseData = await res.json();
            setProgrammeCourses(parseData);
            setLoadingCourses(false);
            
            
        } catch (err) {
            console.error(err.message);
        }
    }

    //TABLE
    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="name"
                    data={ programmes }
                    columns={ columns }
                    search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
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

            <Modal show={show} onHide={handleClose} size="xl">
              <Modal.Header closeButton>
                  <Modal.Title>{programmeName}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {loadingCourses ? (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                </div>
                ) : (
                <ToolkitProvider
                    keyField="courseCode"
                    data={ programmeCourses }
                    columns={ coursesColumns }
                    search
                    >
                    {
                        props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <BootstrapTable
                            { ...props.baseProps } pagination={ paginationFactory(courseOptions) } defaultSorted={ coursesSorted } filter={ filterFactory() }
                            />
                        </div>
                        )
                    }
                </ToolkitProvider>
                )}                           
              </Modal.Body>
            </Modal>             

        </>
    );


}

export default ProgrammesTable;
