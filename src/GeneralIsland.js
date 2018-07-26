import React from 'react';
import timeFormatter from './timeFormatter'


const GeneralIsland = (props) => (
    <div className="general-island">
        {(props.generalWeather !== undefined && props.generalWeather.general !== undefined) ?
            <div> <h4>Singapore Island</h4>
                <div>
                    <ul className="singpore-island searched-list">
                        <li>Humidity: {props.generalData.humidity.low}(Low)  {props.generalData.humidity.high}(High)</li>
                        <li>Temperature: {props.generalData.temperature.low}°C ~ {props.generalData.temperature.high}°C</li>
                    </ul>
                </div>
                <div>
                    <h4>Zone Forecast ({timeFormatter(
                        props.period0.validityPeriod.start)}hrs to {timeFormatter(
                            props.period0.validityPeriod.end)}hrs)</h4>
                    <ul className="searched-list">
                        <li>North: {props.period0.regions.north}</li>
                        <li>South: {props.period0.regions.south}</li>
                        <li>Central: {props.period0.regions.central}</li>
                        <li>East: {props.period0.regions.east}</li>
                        <li>West: {props.period0.regions.west}</li>
                    </ul>
                </div>
            </div> : null}
    </div>
);

export default GeneralIsland;
