import React, { useState, useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import PotentialGraduatesTable from "./PotentialGraduatesTable";

/*
    PotentialGraduates is a component that displays the potential graduates table component.
*/
function PotentialGraduates(){
    /*
        The potentialGraduates state is used store all the potential graduates that will be displayed in the table.
        The loading state is used to keep track of getting the potential graduates from the server. 
        It's initial state is true, so the table will not be displayed until the system has fetched all potential graduates.
    */ 
        const [potentialGraduates, setPotentialGraduates] = useState([]);
        const [loading, setLoading] = useState(true);

    async function getPotentialGraduates(){
        try{
            const res = await fetch("/admin/potential-graduates/students", {
                method: "GET",
            });
            const parseData = await res.json();
            setPotentialGraduates(parseData);
        }
        catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        getPotentialGraduates();
    }, []);


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
                                <PotentialGraduatesTable potentialGraduates={potentialGraduates}></PotentialGraduatesTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PotentialGraduates;