import {distanceCalculator} from './distanceCalculator'

const getNearestArea = (nowCast, userLat, userLng) => {
    let areaStoring = Number.POSITIVE_INFINITY
    let closestAreaToStation

    nowCast.forEach((location) => {
        const dist = distanceCalculator(location.label_location.latitude, location.label_location.longitude, userLat, userLng)

        if (dist < areaStoring) {
            areaStoring = dist
            closestAreaToStation = location.name
        }
    })

    const nearestArea = nowCast.find((location) => {
        return location.name === closestAreaToStation
    })
    return nearestArea
}

export default getNearestArea