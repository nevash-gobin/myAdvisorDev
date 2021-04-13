import React, { useState, useEffect } from "react";
import ProgrammesTable from './ProgrammesTable';

/*
    Programmes is a component that displays the programmes table.
*/
function Programmes() {
    /*
        The programmes state is used store all the programmes that will be displayed in the table.
        The loading state is used to  keep track of getting the programmes from the server. 
        It's initial state is true, so the table will not be displayed until the system has fetched all programmes.
    */ 
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        getProgrammes creates a get request to the server that gets all the programmes on the system and stores it in the programmes state.
    */
    async function getProgrammes() {
        try {
            const res = await fetch("/programmes/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setProgrammes(parseData);
            setLoading(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProgrammes();
    }, []);
    
    return (
        <>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <ProgrammesTable programmes={programmes} loading={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course">Add Programme</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Programmes;