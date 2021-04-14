import React from "react";
import NavigationBlocks from './NavigationBlocks';
import StaffCalendar from './Calendar';
import {Jumbotron, Container} from 'react-bootstrap';

/*
    StaffDashboard is a component that displays all the NavigationBlocks and the StaffCalendar.
*/
function StaffDashboard() {
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Dashboard</h2>
                </Container>
            </Jumbotron>
            <div class="container">
                <div class="row mt-4">
                    {/* Navigation Blocks */}
                    <div class="col-6">
                        <NavigationBlocks/>
                    </div>

                    {/* Calendar */}
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <StaffCalendar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StaffDashboard;