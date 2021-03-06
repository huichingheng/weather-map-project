import React, { Component } from "react";
import ReactDOM from "react-dom";
import GoogleMap from "google-map-react";
import LocationPointer from "./LocationPointer";
import PropTypes from "prop-types";
import UserLocation from "./UserLocation";
import {
  getNowCastData,
  getWindStationData,
  getGeneralData,
  getAirTempData
} from "./dataNEA";
import getNearestStation from "./getNearestStation";
import getNearestArea from "./getNearestArea";
import GeneralIsland from "./GeneralIsland";
import UserSelectedLocation from "./UserSelectedLocation";
import UserLocationDescription from "./UserLocationDescription";
import mapClickBound from "./mapClickBound";
import Legend from "./Legend";

const mediaQuery = () => {
  if (window.matchMedia("(max-width: 960px)").matches) {
    return 10;
  } else return 11.5;
};

const DEFAULT_MAP_CENTER = {
    lat:1.35,
    lng: 103.82007
}

const SINGAPORE = "sg"

class MyMap extends Component {
  static defaultProps = {
    center: [DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng],
    zoom: mediaQuery()
  };

  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      center: {
        lat: DEFAULT_MAP_CENTER.lat,
        lng: DEFAULT_MAP_CENTER.lng
      },
      userLocation: {
        nearestStation: undefined,
        lat: undefined,
        lng: undefined,
        userAddress: undefined,
        nearestArea: undefined
      },
      nowCast: [],
      airTemp: [],
      generalWeather: undefined,
      windStrength: {
        high: 20,
        low: 7.5
      },
      createMapOptions: maps => {
        return {
          panControl: false,
          mapTypeControl: false,
          scrollwheel: true,
          styles: [
            {
              stylers: [{ saturation: -20 }, { visibility: "on" }]
            }
          ]
        };
      }
    };
  }

  onMapLoad = google => {
    google.map.data.loadGeoJson("https://rain-geojson-sg.now.sh/now");
    google.map.data.setStyle(feature => {
      const color = feature.getProperty("color");
      return {
        fillColor: color,
        strokeWeight: 0
      };
    });
  };

  inputChangeHandler = () => {
    if (this.searchBox.getPlace().geometry) {
      const userLat = this.searchBox.getPlace().geometry.location.lat();
      const userLng = this.searchBox.getPlace().geometry.location.lng();
      const userAddress = this.searchBox.getPlace().formatted_address;

      // Set User Selected Address
      this.setState({
        userLocation: {
          ...this.state.userLocation,
          lat: userLat,
          lng: userLng,
          userAddress: userAddress
        }
      });

      // Find Nearest Wind Station and Air Temp Station
      const nearestWindStation = getNearestStation(
        this.state.stations,
        userLat,
        userLng
      );
      const nearestTempStation = getNearestStation(
        this.state.airTemp,
        userLat,
        userLng
      );
      this.setState({
        userLocation: {
          ...this.state.userLocation,
          nearestStation: nearestWindStation,
          nearestTempStation: nearestTempStation
        }
      });

      // Find nearest Area
      const nearestArea = getNearestArea(this.state.nowCast, userLat, userLng);
      this.setState({
        userLocation: { ...this.state.userLocation, nearestArea: nearestArea }
      });
    }
  };

  render() {
    const onMapClick = mapClick => {
      if (mapClickBound(mapClick)) {
        const nearestArea = getNearestArea(
          this.state.nowCast,
          mapClick.lat,
          mapClick.lng
        );
        const nearestStation = getNearestStation(
          this.state.stations,
          mapClick.lat,
          mapClick.lng
        );
        const nearestTempStation = getNearestStation(
          this.state.airTemp,
          mapClick.lat,
          mapClick.lng
        );
        this.setState({
          userLocation: {
            ...this.state.userLocation,
            lat: mapClick.lat,
            lng: mapClick.lng,
            userAddress: null,
            nearestArea: nearestArea,
            nearestStation: nearestStation,
            nearestTempStation: nearestTempStation
          }
        });
      }
    };
    return (
      <div className="main">
        <div className="right-sidebar">
          <h2>Weather App</h2>
          <div className="input-holder">
            <input
              className="input"
              placeholder="Enter your location"
              ref="input"
              {...this.props}
              type="text"
            />
          </div>

          {this.state.userLocation !== undefined ? (
            <UserSelectedLocation
              userLocation={this.state.userLocation}
              className={"searched-location-details"}
            />
          ) : null}

          {this.state.generalWeather !== undefined ? (
            // && this.state.generalWeather.period[0] !== undefined
            <GeneralIsland
              generalWeather={this.state.generalWeather}
              generalData={this.state.generalWeather.general}
              period0={this.state.generalWeather.period0}
            />
          ) : (
            <div className="is-loading" />
          )}

          <Legend
            high={this.state.windStrength.high}
            low={this.state.windStrength.low}
          />
        </div>

        <div className="map">
          <GoogleMap
            options={this.state.createMapOptions}
            bootstrapURLKeys={{
              key: "AIzaSyDzw7Q7Z9N6BgOlBAmmxyRRSuCvx2iRxp8",
              libraries: "places"
            }}
            center={this.props.center}
            zoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={this.onMapLoad}
            onClick={onMapClick}
          >
            <UserLocation
              lat={this.state.userLocation.lat}
              lng={this.state.userLocation.lng}
            />

            <UserLocationDescription
              lat={this.state.userLocation.lat}
              lng={this.state.userLocation.lng}
              userLocation={this.state.userLocation}
            />

            {this.state.stations.map((area, index) => {
              return (
                <LocationPointer
                  key={index}
                  index={index}
                  lat={area.location.latitude}
                  lng={area.location.longitude}
                  angle={area.windBearing}
                  speed={area.speed}
                  high={this.state.windStrength.high}
                  low={this.state.windStrength.low}
                />
              );
            })}
          </GoogleMap>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.setState({
      generalWeather: await getGeneralData(),
      nowCast: await getNowCastData(),
      stations: await getWindStationData(),
      airTemp: await getAirTempData()
    });

    // Google Maps search box
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: SINGAPORE }
    });
    this.searchBox.addListener("place_changed", this.inputChangeHandler);
  }
  componentWillUnmount() {
    // https://developers.google.com/maps/documentation/javascript/events#removing
    window.google.maps.event.clearInstanceListeners(this.searchBox);
  }
}

export default MyMap;
