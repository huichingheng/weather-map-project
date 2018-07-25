
const degreesToRadians = (deg) => {
    return deg * (Math.PI/180)
  }

export const distanceCalculator = (lat1, lng1, lat2, lng2) => {
        const EARTH_RADIUS = 6371;
        const dLat = degreesToRadians(lat2-lat1);  // deg2rad below
        const dLon = degreesToRadians(lng2-lng1); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distanceInKM = EARTH_RADIUS * c;
        return distanceInKM;
      
}