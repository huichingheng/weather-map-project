# Weather Map Project
* Displays rain cloud intensities as a map overlay
* Displays overall island weather forecast
* Displays user specified locality weather data

* *User specified locality's wind data is pulled from the closest wind station, denoted by the arrows on the map*
* *User specified locality's Nowcast (2 Hrs) is pulled from the closest forcast measuring areas*
* *Rain intensity radar overlay data from (https://rain-geojson-sg.now.sh/now)*
* *All other fetched data from NEA*

## Link to page
[Weather App](https://kod2nd-weather-app.netlify.com/)

## Getting set up:

1. Fork and Clone Repo
2. npm install
3. Start app: npm start

## Usage

This app is designed to fetch weather data for Singapore

#### Map Center and zoom
These can be altered in ```MyMap.js``` under ```static defaultProps``` ```center``` and ```zoom```

#### Map Styling Options
In ```MyMap.js``` under ```this.state``` look for the method ```CreateMapOptions``` the following stylers may be added.

```
styles: [{
          stylers: [
              { 'saturation': -20 },
              { 'visibility': 'on' }
              { 'gamma': 0.1 },
              { 'lightness': 4 },
          ] 
```
#### Setting wind strength arrow display


In ```LocationPointer.js``` under change 'high' and 'low' values.

* Wind speeds above 'High': 3 Arrow Heads
* Between 'High' and 'Low': 2 Arrow Heads
* Wind speeds below 'Low': 1 Arrow Head

```
const LocationPointer = (props) => {

    const windSpeedKmh = props.speed * 1.852001
    const windStrengths = {
        high: 20,
        low: 7.5
    }
```
