export const distanceCalculator = (lng1, lng2, lat1, lat2) => {
    const squaredDistance = (lng1 - lng2) ** 2 + (lat1 - lat2) ** 2
    return squaredDistance ** 0.5
}