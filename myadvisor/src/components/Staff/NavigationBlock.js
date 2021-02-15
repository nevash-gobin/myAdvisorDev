import React from "react";
import "../../assets/css/Staff.css";
import { Link } from 'react-router-dom';

function NavigationBlock({title, componentToPassDown, link}) {
    return (
        <div class="col">
            <Link to = {link} class="link">
              <div class="card text-center zoom">
                  <div class="card-body shadow-sm">
                      {componentToPassDown}
                      <p class="block-title">{title}</p> 
                  </div>
              </div>
            </Link>
        </div>
    );
}

export default NavigationBlock;
