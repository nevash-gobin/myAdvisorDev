import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter  } from 'react-bootstrap-table2-filter';


//TABLE SETUP

/*
    selectYearOptions allows you to filter the year table column
*/

const selectYearOptions = {
    1: '1',
    2: '2',
    3: '3'
};

/*
    columns is used to display specific columns of the data on the reports table.
    It also contains code that enables the columns to be filtered.
*/
const columns = [
    { dataField: 'studentID', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'admitTerm', text: 'Admit Term', csvText: 'Admit Term', sort: true},
    { dataField: 'id', text: 'Session ID', csvText: 'Session ID', sort: true },
    { dataField: 'sessionDate', text: 'Session Date', csvText: 'Session Date', sort: true },
]

/*
    defaultSorted sorts the table is ascending order based on the status column.
*/
const defaultSorted = [{
    dataField: 'status',
    order: 'asec'
}];


/*
    options is used to configure the tables pagination.
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

/*
    selectRow allows you to select specific rows in the table.
*/
const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
};
  

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

/*
    ReportsTable is a component that displays the advising sessions in a table where staff can generate reports and export them.
*/
function ReportsTable({sessions, students}) {
    const [loading, setLoading] = useState(true);
    const [studentSessionsDetails, setStudentSessionsDetails] = useState([]);    

    /*
        ToolkitProvider is a wrapper for the BootstrapTable context and the related search, export csv and clear search react contexts.  
    */

    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="id"
                    data={ studentSessionsDetails }
                    columns={ columns }
                    search
                    exportCSV={{
                      fileName: 'report.csv',
                      onlyExportFiltered: true,
                      onlyExportSelection: true,
                      exportAll: true
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } selectRow={ selectRow } defaultSorted={ defaultSorted } filter={ filterFactory()} hover/>
                    </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
        </>
    );

    function studentDetails(){
        let temp = [];

        for (var i in sessions){
            for(var j in students){
                if(sessions[i].studentID == students[j].studentId){
                    temp.push(Object.assign({}, students[j], sessions[i]));
                }
            }
        }

        setStudentSessionsDetails(temp);


        if(temp.length != 0){
            setLoading(false);
        }
        
    };

    useEffect(() => {
        studentDetails();
    },[sessions, students]);    

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
        </>
    );
}

export default ReportsTable;