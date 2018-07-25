import { distanceCalculator } from './distanceCalculator'

const getNearestStation = (stations, userLat, userLng) => {
    let closestWeatherStation = Number.POSITIVE_INFINITY
    let closestWeatherStation
    
    stations.forEach((station) => {
        const distanceFromWeatherStation = distanceCalculator(station.location.latitude, station.location.longitude, userLat, userLng)

        if (distanceFromWeatherStation < closestWeatherStation) {
            closestWeatherStation = distanceFromWeatherStation
            closestWeatherStation = station.id
        }
    })
    const nearestStation = stations.find((station) => {
        return station.id === closestWeatherStation
    })
    return nearestStation
}

export default getNearestStation