/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react';
import LocationPointer from './LocationPointer'
import LocationDescription from './LocationDescription'
import PropTypes from 'prop-types'
// import SearchBox from './SearchBox';






class MyMap extends Component {
    static defaultProps = {
        center: [1.289670, 103.8500700],
        zoom: 11,
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
            windDirection: [],
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
        console.log("Please work!", this.searchBox.getPlaces())
        console.log("Please work!", this.searchBox.getPlaces().length)

        if (this.searchBox.getPlaces().length > 0) {
            console.log("lat", this.searchBox.getPlaces()[0].geometry.location.lat())
            console.log("lng", this.searchBox.getPlaces()[0].geometry.location.lng())
        }
    }

    render() {
        return (
            <div>
                <input ref="input" {...this.props} type="text" />
                <div className="map" style={{ height: '100vh', width: '100%' }}>

                    <GoogleMap
                        options={this.state.createMapOptions}
                        bootstrapURLKeys={{ key: 'AIzaSyDzw7Q7Z9N6BgOlBAmmxyRRSuCvx2iRxp8', libraries: 'places' }}
                        center={this.props.center}
                        zoom={this.props.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={this.onMapLoad}
                    >



                        {/* <SearchBox google={this.onMapLoad}/> */}

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
        this.searchBox = new google.maps.places.SearchBox(input);
        this.searchBox.addListener('places_changed', this.inputChangeHandler);

    }
    componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        google.maps.event.clearInstanceListeners(this.searchBox);
    }
}

export default MyMap