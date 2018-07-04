import React from 'react';
import { directionDisplay } from './directionDisplay';

const UserSelectedLocation = (props) => (
    <div className={(props.userLocation.lat !== undefined) ? props.className : ""}>
        {(props.userLocation.lat !== undefined && props.userLocation.nearestArea !== undefined) ? <h4>Location Details ({(props.userLocation.nearestArea.name)})</h4> : null}
        <ul className="searched-list">
            {/* User Lat Lng Coordinates */}
            {(props.userLocation.lat !== undefined && (props.userLocation.lng !== undefined)) ?
                <div>
                    <li><i>Lat:</i> {props.userLocation.lat.toFixed(6)}, <i>Lng:</i> {props.userLocation.lng.toFixed(6)}</li>
                </div> : null}

            {/* Uncomment if address display is needed */}
            {/* {(props.userLocation.userAddress !== undefined) ? <li>Address: {props.userLocation.userAddress} </li> : null} */}

            {/*Wind Speeds and Direction*/}
            {(props.userLocation.nearestStation !== undefined) ?
                <div>
                    {(props.userLocation.nearestStation.speed !== undefined) ?
                        <li>Wind Speed:  {(props.userLocation.nearestStation.speed * 1.852001).toFixed(2)} km/h - '{directionDisplay(props.userLocation.nearestStation.windBearing)}'</li> : null}

                    {(props.userLocation.nearestStation.humidity !== undefined) ? <li>Humidity: {props.userLocation.nearestStation.humidity}</li> : null}
                </div> : null}

            {/*Air Temp*/}
            {(props.userLocation.nearestTempStation !== undefined) ?
                <div>
                    {(props.userLocation.nearestTempStation.airTemp !== undefined) ?
                        <li>Air Temp:  {props.userLocation.nearestTempStation.airTemp} °C</li> : null}
                </div> : null}

            {/*Now Cast*/}
            {(props.userLocation.nearestArea !== undefined) ?
                <div>
                    <li>Nowcast (2 Hr): {props.userLocation.nearestArea.forecast}</li>
                </div> : null}
        </ul>
    </div>
);

export default UserSelectedLocation;
