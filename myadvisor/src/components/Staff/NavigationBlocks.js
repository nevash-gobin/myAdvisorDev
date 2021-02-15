import React from "react";
import NavigationBlock from './NavigationBlock';

import { IconContext } from "react-icons";
import { BsPeopleFill, BsFillLayersFill, BsPersonFill } from "react-icons/bs";
import { HiDocumentReport, HiClipboardCheck, HiArchive, HiCollection } from "react-icons/hi";
import { FaWrench } from "react-icons/fa";

import "../../assets/css/Staff.css";

function NavigationBlocks() {
    return (
        <IconContext.Provider value={{ color: "#2196F3", className: "nav-block-icon", size: 50 }}>
            <div>
                <div class="row">
                    {/* Students */}
                    <NavigationBlock componentToPassDown={<BsPeopleFill/>} title={"Students"} link={"/staff/students"}/>

                    {/* Completed */}
                    <NavigationBlock componentToPassDown={<HiClipboardCheck/>} title={"Completed"}/>

                    {/* Reports */}
                    <NavigationBlock componentToPassDown={<HiDocumentReport/>} title={"Reports"}/>

                    {/* Edit Courses */}
                    <NavigationBlock componentToPassDown={<HiCollection/>} title={"Courses"} link={"/staff/courses"}/>
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

export default NavigationBlocks;
