import React from 'react';
import { direcionDisplay } from './directionDisplay'

const SearchedLocationDetails = (props) => {
    console.log(props.userLocation)
    return (
        <div>
            {(props.userLocation !== undefined) ?
                <ul className="searched-location-details">
                    {(props.userLocation.lat !== undefined && (props.userLocation.lng !== undefined)) ?
                        <div>

                            <li>Lat: {props.userLocation.lat.toFixed(6)}</li>
                            <li>Lng: {props.state.userLocation.lng.toFixed(6)}</li>
                        </div>
                        : <div>To display weather data, seach for a location.</div>}

                    {(props.userLocation.userAddress !== undefined) ? <li>Address: {props.userLocation.userAddress} </li> : null}


                    {(props.userLocation.nearestStation !== undefined) ?
                        <div>
                            <li>Wind Speed:  {(props.userLocation.nearestStation.speed * 1.852001).toFixed(2)} km/h - '{direcionDisplay(props.userLocation.nearestStation.windBearing)}'</li>
                            {(props.userLocation.nearestStation.humidity !== undefined) ? <li>Humidity: {props.userLocation.nearestStation.humidity}</li> : null}
                        </div> : null}
                </ul> : null}
        </div >
    )
};

export default SearchedLocationDetails;
