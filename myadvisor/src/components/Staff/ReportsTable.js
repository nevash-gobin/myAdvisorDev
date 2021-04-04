import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter  } from 'react-bootstrap-table2-filter';


//TABLE SETUP

const selectStatusOptions = {
    Complete: 'Complete',
    Incomplete: 'Incomplete'
};

const selectYearOptions = {
    1: '1',
    2: '2',
    3: '3'
};


const columns = [
    { dataField: 'studentID', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'year', text: 'Year', csvText: 'Year', sort: true, 
        formatter: cell => selectYearOptions[cell],
        filter: selectFilter({
            options: selectYearOptions,
        })    
    },
    { dataField: 'advisingDate', text: 'Advising Date', csvText: 'Advising Date', sort: true },
    { dataField: 'status', text: 'Status', csvText: 'Status', sort: true,
        formatter: cell => selectStatusOptions[cell],
        filter: selectFilter({
            options: selectStatusOptions,
        })    
    },
]

const defaultSorted = [{
    dataField: 'status',
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

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
};
  

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

function ReportsTable({sessions, loading}) {

    //TABLE

    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="studentID"
                    data={ sessions }
                    columns={ columns }
                    search
                    exportCSV={{
                      fileName: 'report.csv',
                      onlyExportFiltered: true, 
                      exportAll: false
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted } filter={ filterFactory()} hover/>
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
        </>
    );
}

export default ReportsTable;