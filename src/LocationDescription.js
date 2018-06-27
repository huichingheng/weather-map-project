import React from 'react'
import {distanceCalculator} from './directionDisplay'


const LocationDescription = (props) => {

    const locationDetails = {
        name: props.text,
        windSpeed: (props.speed * 1.852001).toFixed(2),
        windDirection: props.angle,
        humidity: props.humidity,
        forcast: "hot"
    }

    return (
        <div>
            {/* <div className="marker">{text}</div> */}
            <div
                className="text"
                style={{ transform: `translate(-50%, -50%)` }}>
                {`${props.text} `}

                <ul className="stats">
                    <li>Wind Direction: {distanceCalculator(locationDetails.windDirection)} {locationDetails.windDirection}°</li>
                    <li>Wind Speed (Km/h): {locationDetails.windSpeed} </li>
                    {(locationDetails.humidity !== undefined) ? <li>Humidity: {locationDetails.humidity}</li>: null }
                    {/* <li> {locationDetails.humidity}}</li> */}
                </ul>
            </div>

        </div>)
};

export default LocationDescription