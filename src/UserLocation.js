import React from 'react';

const UserLocation = (props) => {
    if(props.lat !== undefined && props.lng !== undefined){
        return <div className="here"></div>; 
    } return <div></div>;
}

export default UserLocation;
