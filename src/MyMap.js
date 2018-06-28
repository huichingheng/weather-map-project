import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react';
import LocationPointer from './LocationPointer'
import LocationDescription from './LocationDescription'
import PropTypes from 'prop-types'
import UserLocation from './UserLocation';
import { distanceCalculator } from './distanceCalculator'
import { direcionDisplay } from './directionDisplay';
import { getNowCastData, getWindStationData, getGeneralData } from './dataNEA'
import timeFormatter from './timeFormatter'


class MyMap extends Component {
    static defaultProps = {
        center: [1.35, 103.8200700],
        zoom: 11.25,
    };

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
                nearestStation: undefined,
                lat: undefined,
                lng: undefined,
                userAddress: undefined,
                nearestArea: undefined
            },
            nowCast: [],
            generalWeather: undefined,
            createMapOptions: (maps) => {
                return {
                    panControl: false,
                    mapTypeControl: false,
                    scrollwheel: true,
                    styles: [{
                        stylers: [
                            { 'saturation': -20 },
                            // { 'gamma': 0.1 },
                            // { 'lightness': 4 },
                            { 'visibility': 'on' }
                        ]
                    }],

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
            userLocation: { ...this.state.userLocation, lat: userLat, lng: userLng, userAddress: userAddress }
        })

        // Finding the nearest wind station
        let stationStoring = Number.POSITIVE_INFINITY
        let closestWeatherStationToStation
        this.state.stations.forEach((station) => {
            const dist = distanceCalculator(station.location.latitude, station.location.longitude, userLat, userLng)

            if (dist < stationStoring) {
                stationStoring = dist
                closestWeatherStationToStation = station.id
            }
        })
        const nearestStation = this.state.stations.find((station) => {
            return station.id === closestWeatherStationToStation
        })
        this.setState({ userLocation: { ...this.state.userLocation, nearestStation: nearestStation } })



        // ================ NowCast Station =====================
        let areaStoring = Number.POSITIVE_INFINITY
        let closestAreaToStation

        this.state.nowCast.forEach((location) => {
            const dist = distanceCalculator(location.label_location.latitude, location.label_location.longitude, userLat, userLng)

            if (dist < areaStoring) {
                areaStoring = dist
                closestAreaToStation = location.name
            }
        })

        const nearestArea = this.state.nowCast.find((location) => {
            return location.name === closestAreaToStation
        })
        this.setState({ userLocation: { ...this.state.userLocation, nearestArea: nearestArea } })
    }




    render() {
        return (
            <div className="main">
                <div className="right-sidebar">
                    <h2>Weather App</h2>
                    <div className="input-holder">
                        <input className="input" placeholder="Enter your location" ref="input" {...this.props} type="text" />
                    </div>
                    <div className={(this.state.userLocation.lat !== undefined) ? "searched-location-details" : ""}>
                        {(this.state.userLocation.lat !== undefined && this.state.userLocation.nearestArea !== undefined) ? <h4>Location Details ({(this.state.userLocation.nearestArea.name)})</h4> : null}
                        <ul className="searched-list">
                            {(this.state.userLocation.lat !== undefined && (this.state.userLocation.lng !== undefined)) ?
                                <div>
                                    <li><i>Lat:</i> {this.state.userLocation.lat.toFixed(6)}, <i>Lng:</i> {this.state.userLocation.lng.toFixed(6)}</li>
                                </div> : null}

                            {/* Uncomment if address display is needed */}
                            {/* {(this.state.userLocation.userAddress !== undefined) ? <li>Address: {this.state.userLocation.userAddress} </li> : null} */}

                            {(this.state.userLocation.nearestStation !== undefined) ?
                                <div>
                                    {(this.state.userLocation.nearestStation.speed !== undefined) ?
                                        <li>Wind Speed:  {(this.state.userLocation.nearestStation.speed * 1.852001).toFixed(2)} km/h - '{direcionDisplay(this.state.userLocation.nearestStation.windBearing)}'</li> : null}

                                    {(this.state.userLocation.nearestStation.humidity !== undefined) ? <li>Humidity: {this.state.userLocation.nearestStation.humidity}</li> : null}
                                </div> : null}

                            {(this.state.userLocation.nearestArea !== undefined) ?
                                <div>
                                    <li>2 Hour: {this.state.userLocation.nearestArea.forecast}</li>
                                </div> : null}
                        </ul>
                    </div>

                    <div className="general-island">
                        {(this.state.generalWeather !== undefined) ?
                            <div> <h4>Singapore Island</h4>
                                <div>
                                    <ul className="singpore-island searched-list">
                                        <li>Humidity: {this.state.generalWeather.general.humidity.low}(Low)  {this.state.generalWeather.general.humidity.high}(High)</li>
                                        <li>Temperature: {this.state.generalWeather.general.temperature.low}°C ~ {this.state.generalWeather.general.temperature.high}°C</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>Zone Forcast</h4>
                                    <ul className="searched-list">
                                        <li>North: {this.state.generalWeather.period0.regions.north}</li>
                                        <li>South: {this.state.generalWeather.period0.regions.south}</li>
                                        <li>East: {this.state.generalWeather.period0.regions.east}</li>
                                        <li>West: {this.state.generalWeather.period0.regions.west}</li>
                                    </ul>
                                    <h4>Zone Forecast Validity Period</h4>
                                    <div>{timeFormatter(
                                        this.state.generalWeather.period0.validityPeriod.start)}
                                        {" to "}
                                        {timeFormatter(
                                            this.state.generalWeather.period0.validityPeriod.end)}
                                    </div>
                                </div>
                            </div> : null}

                    </div>
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

        this.setState({
            generalWeather: await getGeneralData()
        })

        this.setState({
            nowCast: await getNowCastData()
        })

        this.setState({
            stations: await getWindStationData()
        })

        // Google Maps search box
        var input = ReactDOM.findDOMNode(this.refs.input);
        this.searchBox = new window.google.maps.places.Autocomplete(input,
            { componentRestrictions: { country: 'sg' } });
        this.searchBox.addListener('place_changed', this.inputChangeHandler);

    }
    componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        window.google.maps.event.clearInstanceListeners(this.searchBox);
    }
}

export default MyMap