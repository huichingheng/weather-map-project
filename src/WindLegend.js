import React from 'react';
import low from './wind-low.png'
import med from './wind-med.png'
import high from './wind-strong.png'

const WindLegend = (props) => (
    <div id="wind-legend-wrapper">
        <h4 id="wind-legend-header">Wind Speeds</h4>
        <div id="wind-legend-container">
            <div className="wind-icon-desc">
                <img className="wind-legend-icons" src={low} alt="" />
                <p>{"< " + props.low + " km/h"}</p>
            </div>
            <div className="wind-icon-desc">
                <img className="wind-legend-icons" src={med} alt="" />
                <p>{props.low} - {props.high} km/h</p>
            </div>
            <div className="wind-icon-desc">
                <img className="wind-legend-icons" src={high} alt="" />
                <p>{"> " + props.high + " km/h"}</p>
            </div>

        </div>
    </div>
);

export default WindLegend;
