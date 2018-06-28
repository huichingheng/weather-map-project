import React from 'react';
import { direcionDisplay } from './directionDisplay';

const UserSelectedLocation = (props) => (
    <div className={(props.userLocation.lat !== undefined) ? "searched-location-details" : ""}>
        {(props.userLocation.lat !== undefined && props.userLocation.nearestArea !== undefined) ? <h4>Location Details ({(props.userLocation.nearestArea.name)})</h4> : null}
        <ul className="searched-list">
            {(props.userLocation.lat !== undefined && (props.userLocation.lng !== undefined)) ?
                <div>
                    <li><i>Lat:</i> {props.userLocation.lat.toFixed(6)}, <i>Lng:</i> {props.userLocation.lng.toFixed(6)}</li>
                </div> : null}

            {/* Uncomment if address display is needed */}
            {/* {(props.userLocation.userAddress !== undefined) ? <li>Address: {props.userLocation.userAddress} </li> : null} */}

            {(props.userLocation.nearestStation !== undefined) ?
                <div>
                    {(props.userLocation.nearestStation.speed !== undefined) ?
                        <li>Wind Speed:  {(props.userLocation.nearestStation.speed * 1.852001).toFixed(2)} km/h - '{direcionDisplay(props.userLocation.nearestStation.windBearing)}'</li> : null}

                    {(props.userLocation.nearestStation.humidity !== undefined) ? <li>Humidity: {props.userLocation.nearestStation.humidity}</li> : null}
                </div> : null}

            {(props.userLocation.nearestArea !== undefined) ?
                <div>
                    <li>Nowcast (2 Hr): {props.userLocation.nearestArea.forecast}</li>
                </div> : null}
        </ul>
    </div>
);

export default UserSelectedLocation;
