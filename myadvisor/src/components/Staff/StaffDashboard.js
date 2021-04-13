import React from "react";
import NavigationBlocks from './NavigationBlocks';
import StaffCalendar from './Calendar';

/*
    StaffDashboard is a component that displays all the NavigationBlocks and the StaffCalendar.
*/
function StaffDashboard() {
    return (
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
            {/*Space to expand
            <div class="row mt-4 mb-4">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body shadow-sm">
                            
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card h-100">
                        <div class="card-body shadow-sm">
                            
                        </div>
                    </div>
                </div>
            </div>
            */}
        </div>
    );
}

export default StaffDashboard;