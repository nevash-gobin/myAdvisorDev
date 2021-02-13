import React, { Component } from "react";
import {Link } from "react-router-dom";

import NavigationBlock from './NavigationBlock';

import { IconContext } from "react-icons";
import { BsPeopleFill, BsFillLayersFill, BsPersonFill } from "react-icons/bs";
import { HiDocumentReport, HiClipboardCheck, HiArchive, HiCollection } from "react-icons/hi";
import { FaWrench, FaSquare } from "react-icons/fa";

import "../../assets/css/StaffDashboard.css";



class NavigationBlocks extends Component {
  render() {
    return (
        <IconContext.Provider value={{ color: "#2196F3", className: "nav-block-icon", size: 50 }}>
            <div>
                <div class="row">
                    {/* Students */}
                    <NavigationBlock componentToPassDown={<BsPeopleFill/>} title={"Students"}/>

                    {/* Completed */}
                    <NavigationBlock componentToPassDown={<HiClipboardCheck/>} title={"Completed"}/>

                    {/* Reports */}
                    <NavigationBlock componentToPassDown={<HiDocumentReport/>} title={"Reports"}/>

                    {/* Edit Courses */}
                    <NavigationBlock componentToPassDown={<HiCollection/>} title={"Courses"}/>
                </div>

                <div class="row mt-4">
                    {/* Programmes */}
                    <NavigationBlock componentToPassDown={<BsFillLayersFill/>} title={"Programmes"}/>

                    {/* Archive */}
                    <NavigationBlock componentToPassDown={<HiArchive/>} title={"Archive"}/>

                    {/* Blank */}
                    <NavigationBlock componentToPassDown={<FaWrench/>} title={"Settings"}/>

                    {/* Blank */}
                    <NavigationBlock componentToPassDown={<BsPersonFill/>} title={"Profile"}/>
                </div>
            </div>
        </IconContext.Provider>
    );
  }
}

export default NavigationBlocks;
