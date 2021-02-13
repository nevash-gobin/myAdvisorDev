import React, { Component } from "react";
import NavigationBlocks from './NavigationBlocks'

class StaffDashboard extends Component {
  render() {
    return (
        <div class="container">
            <div class="row mt-4">
                {/* Navigation Blocks */}
                <div class="col-8">
                    <NavigationBlocks/>
                </div>

                {/* Latest */}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            Latest
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                {/* Calender */}
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            Calender
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            Feed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default StaffDashboard;