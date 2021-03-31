import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

//TABLE SETUP

const columns = [
    { dataField: 'studentID', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'advisingDate', text: 'Advising Date', csvText: 'Advising Date', sort: true },
    { dataField: 'status', text: 'Status', csvText: 'Status', sort: true },
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
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted } selectRow={ selectRow }/>
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