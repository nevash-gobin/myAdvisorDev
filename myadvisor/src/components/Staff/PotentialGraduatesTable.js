import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter  } from 'react-bootstrap-table2-filter';

//TABLE SETUP

/*
    columns is used to display specific columns of the data on the table.
*/

const columns = [
    { dataField: 'studentId', text: 'Student Id', csvText: 'Student Id', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'degree', text: 'Degree', csvText: 'Degree', sort: true}
    
]

/*
    defaultSorted sorts the tables is ascending order based on the name column.
*/
const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
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


function PotentialGraduatesTable({potentialGraduates}){
    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                keyField="studentId"
                data={ potentialGraduates }
                columns={ columns }
                search
                exportCSV={{
                    fileName: 'potentialgraduates.csv',
                }}
            >
                {
                    props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                            <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted }/>
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
            
        </>
    );

    return (
        <>
        <PaginationProvider pagination={paginationFactory(options)}>
                { table }
        </PaginationProvider>
        </>
    )
}

export default PotentialGraduatesTable;