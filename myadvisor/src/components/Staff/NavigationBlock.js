import React, { Component } from "react";
import "../../assets/css/StaffDashboard.css";


class NavigationBlock extends Component {
  render() {
    return (
        <div class="col">
            <div class="card text-center zoom">
                <div class="card-body">
                    {this.props.componentToPassDown}
                    <p class="block-title">{this.props.title}</p> 
                </div>
            </div>
        </div>
    );
  }
}

export default NavigationBlock;
