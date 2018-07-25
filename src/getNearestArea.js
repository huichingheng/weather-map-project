import {distanceCalculator} from './distanceCalculator'

const getNearestArea = (nowCast, userLat, userLng) => {
    let closestWeatherStation = Number.POSITIVE_INFINITY
    let closestAreaToStation

    nowCast.forEach((location) => {
        const distanceFromWeatherStation = distanceCalculator(location.label_location.latitude, location.label_location.longitude, userLat, userLng)

        if (distanceFromWeatherStation < closestWeatherStation) {
            closestWeatherStation = distanceFromWeatherStation
            closestAreaToStation = location.name
        }
    })

    const nearestArea = nowCast.find((location) => {
        return location.name === closestAreaToStation
    })
    return nearestArea
}

export default getNearestArea