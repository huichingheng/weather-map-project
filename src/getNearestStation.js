import {distanceCalculator} from './distanceCalculator'

const getNearestStation = (stations, userLat, userLng) => {
    let closestWeatherStation = Number.POSITIVE_INFINITY
        let closestWeatherStationToUserLocation
        stations.forEach((station) => {
            const dist = distanceCalculator(station.location.latitude, station.location.longitude, userLat, userLng)

            if (dist < closestWeatherStation) {
                closestWeatherStation = dist
                closestWeatherStationToUserLocation = station.id
            }
        })
        const nearestStation = stations.find((station) => {
            return station.id === closestWeatherStationToUserLocation
        })
        return nearestStation
}

export default getNearestStation