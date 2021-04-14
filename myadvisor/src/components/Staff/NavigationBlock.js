import React from "react";
import { Link } from 'react-router-dom';

/*
    NavigationBlock is a component that creates a single navigation block on the dashboard based on information passed to it.
    It allows you to navigate to other components.
*/
function NavigationBlock({title, componentToPassDown, link}) {
    return (
        <div class="col">
            <Link to = {link} style={{ textDecoration: 'none' }}>
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
