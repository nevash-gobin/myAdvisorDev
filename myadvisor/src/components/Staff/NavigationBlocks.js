import React from "react";
import NavigationBlock from './NavigationBlock';

import { IconContext } from "react-icons";
import { BsPeopleFill, BsFillLayersFill, BsPersonFill } from "react-icons/bs";
import { HiDocumentReport, HiAnnotation, HiArchive, HiCollection } from "react-icons/hi";
import { FaWrench } from "react-icons/fa";

function NavigationBlocks() {
    return (
        <IconContext.Provider value={{ color: "#2196F3", className: "nav-block-icon", size: 50 }}>
            <div>
                <div class="row">
                    {/* Students */}
                    <NavigationBlock componentToPassDown={<BsPeopleFill/>} title={"Students"} link={"/staff/students"}/>

                    {/* Completed */}
                    <NavigationBlock componentToPassDown={<HiAnnotation/>} title={"Sessions"} link={"/staff"}/>

                    {/* Reports */}
                    <NavigationBlock componentToPassDown={<HiDocumentReport/>} title={"Reports"} link={"/staff/reports"}/>

                    {/* Edit Courses */}
                    <NavigationBlock componentToPassDown={<HiCollection/>} title={"Courses"} link={"/staff/courses"}/>
                </div>

                <div class="row mt-4">
                    {/* Programmes */}
                    <NavigationBlock componentToPassDown={<BsFillLayersFill/>} title={"Programmes"} link={"/staff/programmes"}/>

                    {/* Archive */}
                    <NavigationBlock componentToPassDown={<HiArchive/>} title={"Archive"} link={"/staff"}/>

                    {/* Blank */}
                    <NavigationBlock componentToPassDown={<FaWrench/>} title={"Settings"} link={"/staff/settings"}/>

                    {/* Blank */}
                    <NavigationBlock componentToPassDown={<BsPersonFill/>} title={"Profile"} link={"/staff"}/>
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default NavigationBlocks;
