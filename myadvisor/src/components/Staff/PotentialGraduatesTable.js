import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

//TABLE SETUP

/*
    columns is used to display specific columns of the data on the table.
*/

const columns = [
    { dataField: 'studentID', text: 'Student ID', csvText: 'Student ID', sort: true },
    { dataField: 'name', text: 'Name', csvText: 'Name', sort: true },
    { dataField: 'admitTerm', text: 'Admit Term', csvText: 'Admit Term', sort: true},
    
]



const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;



function PotentialGraduatesTable({potentialGraduates, students}){
    return (
        <>

        </>
    );
}

export default PotentialGraduatesTable;