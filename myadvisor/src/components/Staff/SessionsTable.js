import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

//TABLE SETUP

/*
    columns is used to display specific columns of the data on the table.
*/
const columns = [
    { dataField: 'id', text: 'Session ID', csvText: 'Session ID', sort: true },
    { dataField: 'studentID', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'admitTerm', text: 'Admit Term', csvText: 'Admit Term', sort: true},
    { dataField: 'sessionDate', text: 'Session Date', csvText: 'Session Date', sort: true },
]

/*
    defaultSorted sorts the table is ascending order based on the sessionDate column.
*/
const defaultSorted = [{
    dataField: 'sessionDate',
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
    SessionsTable is a component that displays the courses in the system in a table.
*/
function SessionsTable({sessions, students}) {
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
                      fileName: 'sessions.csv',
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted } hover/>
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
                    temp.push(Object.assign({}, students[j], sessions[i]))
                }
            }
        }

        setStudentSessionsDetails(temp);

        if(temp.length !=0 ){
            setLoading(false);
        }

    };

    useEffect(() => {
        studentDetails();
    }, [sessions, students]);

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

export default SessionsTable;