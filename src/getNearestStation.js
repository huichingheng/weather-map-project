import {distanceCalculator} from './distanceCalculator'

const getNearestStation = (stations, userLat, userLng) => {
    let distanceCounter = Number.POSITIVE_INFINITY
        let closestWeatherStationToStation
        stations.forEach((station) => {
            const dist = distanceCalculator(station.location.latitude, station.location.longitude, userLat, userLng)

            if (dist < distanceCounter) {
                distanceCounter = dist
                closestWeatherStationToStation = station.id
            }
        })
        const nearestStation = stations.find((station) => {
            return station.id === closestWeatherStationToStation
        })
        return nearestStation
}

export default getNearestStation