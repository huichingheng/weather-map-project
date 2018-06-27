/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react';
import LocationPointer from './LocationPointer'
import LocationDescription from './LocationDescription'
import PropTypes from 'prop-types'
import UserLocation from './UserLocation';
import { distanceCalculator } from './distanceCalculator'
import { direcionDisplay } from './directionDisplay';


class MyMap extends Component {
    static defaultProps = {
        center: [1.35, 103.8200700],
        zoom: 11.25,
        // visibleRowFirst: -1,
        // visibleRowLast: -1,
        // hoveredRowIndex: -1
    };
    // ==============================SEARCH BOX =================================
    static propTypes = {
        placeholder: PropTypes.string,
        onPlacesChanged: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            center: {
                lat: 1.35,
                lng: 103.82007
            },
            userLocation: {
                lat: undefined,
                lng: undefined,
                userAddress: undefined,
                nearestStation: undefined
            },
            createMapOptions: (maps) => {
                return {
                    panControl: false,
                    mapTypeControl: false,
                    scrollwheel: true,
                    // styles: [{
                    //     stylers: [
                    //         { 'saturation': -100 },
                    //         { 'gamma': 0.1 },
                    //         { 'lightness': 4 },
                    //         { 'visibility': 'on' }
                    //     ]
                    // }],

                }
            }
        }
    }

    onMapLoad = (google) => {
        google.map.data.loadGeoJson('https://rain-geojson-sg.now.sh/now')
        google.map.data.setStyle((feature) => {
            const color = feature.getProperty('color')
            return {
                fillColor: color,
                strokeWeight: 0
            }
        })
    }

    inputChangeHandler = () => {
        const userLat = this.searchBox.getPlace().geometry.location.lat()
        const userLng = this.searchBox.getPlace().geometry.location.lng()
        const userAddress = this.searchBox.getPlace().formatted_address

        this.setState({
            userLocation: { lat: userLat, lng: userLng, userAddress: userAddress }
        })

        // Finding the nearest wind station
        let x = Number.POSITIVE_INFINITY
        let y
        this.state.stations.forEach((station) => {
            const dist = distanceCalculator(station.location.latitude, station.location.longitude, userLat, userLng)

            if (dist < x) {
                x = dist
                y = station.id
            }
        })

        const nearestStation = this.state.stations.find((station) => {
            return station.id === y
        })
        this.setState({ nearestStation: nearestStation })
        console.log("blah", nearestStation)
        // console.log("the distance", x, "12321",y)

    }

    render() {
        return (
            <div className="main">
                <div className="right-sidebar">
                    <input className="input" placeholder="Enter your location" ref="input" {...this.props} type="text" />
                    <ul className="searched-location-details"> 
                        {(this.state.userLocation.lat !== undefined && (this.state.userLocation.lng !== undefined)) ?
                            <div>
                                <li>Lat: {this.state.userLocation.lat.toFixed(6)}</li>
                                <li>Lng: {this.state.userLocation.lng.toFixed(6)}</li>
                            </div>
                            : null}

                        {(this.state.userLocation.userAddress !== undefined) ? <li>Address: {this.state.userLocation.userAddress} </li> : null}


                        {(this.state.nearestStation !== undefined) ?
                            <div>
                                <li>Wind Speed:  {(this.state.nearestStation.speed  * 1.852001).toFixed(2)} km/h - '{direcionDisplay(this.state.nearestStation.windBearing)}'</li>
                                {(this.state.nearestStation.humidity !== undefined) ? <li>Humidity: {this.state.nearestStation.humidity}</li>: null }
                            </div> : null}
                    </ul>
                </div>
                <div className="map" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMap
                        options={this.state.createMapOptions}
                        bootstrapURLKeys={{ key: 'AIzaSyDzw7Q7Z9N6BgOlBAmmxyRRSuCvx2iRxp8', libraries: 'places' }}
                        center={this.props.center}
                        zoom={this.props.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={this.onMapLoad}
                    >

                        <UserLocation
                            lat={this.state.userLocation.lat}
                            lng={this.state.userLocation.lng} />


                        {this.state.stations.map((area, index) => {
                            return <LocationPointer
                                key={index}
                                index={index}
                                lat={area.location.latitude}
                                lng={area.location.longitude}
                                angle={area.windBearing}
                                speed={area.speed}
                            />
                        })}

                        {this.state.stations.map((area, index) => {
                            return <LocationDescription
                                key={index}
                                lat={area.location.latitude}
                                lng={area.location.longitude}
                                text={area.name}
                                speed={area.speed}
                                angle={area.windBearing}
                                humidity={area.humidity}
                            />
                        })}
                    </GoogleMap>
                </div>
            </div>
        );
    }

    async componentDidMount() {

        // ====Wind Direction====
        const responseWindDirection = await fetch('https://api.data.gov.sg/v1/environment/wind-direction')
        const dataWindDirection = await responseWindDirection.json()
        const stationLocationsData = dataWindDirection.metadata.stations
        const windDirectionData = dataWindDirection.items[0].readings

        windDirectionData.map(windStation => {
            const associatedStations = stationLocationsData.find(station => {
                return station.id === windStation.station_id
            })
            associatedStations.windBearing = windStation.value
            return associatedStations
        })

        // ====Humidity====
        const responseHumidity = await fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
        const dataHumidity = await responseHumidity.json()
        const humidity = dataHumidity.items[0].readings

        humidity.map(humidityStation => {
            const associatedStations =
                stationLocationsData.find(station => {
                    return station.id === humidityStation.station_id
                })
            if (associatedStations !== undefined) {
                associatedStations.humidity = humidityStation.value
            }
            return associatedStations
        })

        // ====Wind Speed====
        const responseWindSpeed = await fetch('https://api.data.gov.sg/v1/environment/wind-speed')
        const dataWindSpeed = await responseWindSpeed.json()
        const windSpeedData = dataWindSpeed.items[0].readings

        const stationConsolidatedData =
            windSpeedData.map(windStation => {
                const associatedStations =
                    stationLocationsData.find(station => {
                        return station.id === windStation.station_id
                    })
                if (associatedStations !== undefined) {
                    associatedStations.speed = windStation.value
                }

                return associatedStations
            })


        this.setState({
            stations: stationConsolidatedData
        })

        var input = ReactDOM.findDOMNode(this.refs.input);
        this.searchBox = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: 'sg' }
        });
        // console.log(this.searchBox)
        this.searchBox.addListener('place_changed', this.inputChangeHandler);

    }
    componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        google.maps.event.clearInstanceListeners(this.searchBox);
    }
}

export default MyMap