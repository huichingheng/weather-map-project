/* global google */

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react';
import LocationPointer from './LocationPointer'
import LocationDescription from './LocationDescription'
import PropTypes from 'prop-types'


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
            userLocation: {
                lat: undefined,
                lng: undefined,
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

        this.setState({
            userLocation: { lat: userLat, lng: userLng }

        })


        // console.log("lat", this.searchBox.getPlace().geometry.location.lat())
        // console.log("lng", this.searchBox.getPlace().geometry.location.lng())
    }

    render() {
        return (
            <div className="main">
                <div className="right-sidebar">
                    <input className="input" placeholder="Enter your location" ref="input" {...this.props} type="text" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique accusamus praesentium nihil non recusandae, repellendus sed mollitia quos hic voluptatem suscipit incidunt atque rem aliquam vero? Voluptatem minima perspiciatis nam unde fuga asperiores ex. Quo itaque eos assumenda nulla dicta totam at molestiae voluptas sapiente magnam, possimus provident fugit non ipsa quos adipisci amet vero qui, aliquid ipsam saepe iure, corrupti quidem earum! Nesciunt, incidunt doloribus, facere aut ipsam velit quisquam veniam distinctio neque, explicabo in. Expedita, maxime veniam!</p>
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