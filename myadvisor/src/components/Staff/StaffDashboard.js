import React from "react";
import NavigationBlocks from './NavigationBlocks';
import StaffCalendar from './Calendar';

function StaffDashboard() {
    return (
        <div class="container">
            <div class="row mt-4">
                {/* Navigation Blocks */}
                <div class="col-7">
                    <NavigationBlocks/>
                </div>

                {/* Latest */}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body shadow-sm">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4 mb-4">
                {/* Calender */}
                <div class="col-8">
                    <div class="card">
                        <div class="card-body shadow-sm">
                            <StaffCalendar/>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body shadow-sm">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;