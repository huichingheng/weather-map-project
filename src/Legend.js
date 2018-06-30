import React from 'react';
import RainIntensity from './RainIntensity'
import WindLegend from './WindLegend'

const Legend = (props) => (
    <div className="legend">
        <RainIntensity />
        <WindLegend
            high={props.high}
            low={props.low} />
    </div>
);

export default Legend;
