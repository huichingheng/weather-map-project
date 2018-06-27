import React from 'react';

const LocationPointer = (props) => {

    const windSpeedKmh = props.speed * 1.852001
    const windStrengths = {
        high: 20,
        low: 7.5
    }
    const windStrength = () => {
        if (windSpeedKmh > windStrengths.high) {
            return "wind-high"
        } if (windSpeedKmh < windStrengths.low) {
            return "wind-low"
        } return "wind-med"
    }

    return (
        <div>
            {/* <div className="marker">{text}</div> */}
            <div
                className={windStrength()}
                id={props.index}
                style={{
                    transform: `
                            translate(-50%, -50%) 
                            rotate(${props.angle}deg)`
                }}>
            </div>

        </div>)
};

export default LocationPointer;