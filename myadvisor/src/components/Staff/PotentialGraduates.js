import { Container, Jumbotron } from "react-bootstrap";
import PotentialGraduatesTable from "./PotentialGraduatesTable";

/*
    PotentialGraduates is a component that displays the potential graduates table component.
*/

function PotentialGraduates(){
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Potential Graduates</h2>
                </Container>
            </Jumbotron>
            <div class="container">
                <div class="row mt-4">
                    {/* Potential Graduates Table */}
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <PotentialGraduatesTable></PotentialGraduatesTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PotentialGraduates;