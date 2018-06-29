import React from 'react';
import UserSelectedLocation from './UserSelectedLocation'

const UserLocationDescription = (props) => (
    <div>
        <UserSelectedLocation
            lat={props.lat}
            lng={props.lng}
            userLocation={props.userLocation}
            className={"text"}/>
    </div>
);

export default UserLocationDescription;
