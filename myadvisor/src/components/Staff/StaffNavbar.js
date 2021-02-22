import React from "react";
import "../../assets/css/Staff.css";
import { Link } from 'react-router-dom';


function StaffNavbar() {
    return (
        <nav class="navbar navbar-dark shadow-sm" >
            <div class="container-fluid">
                <Link to = "/staff" className="link"><p className="navbar-brand">myAdvisor</p></Link>
            </div>
        </nav>
    );
}

export default StaffNavbar;
