const directionCalculator = (bearing, angle, offset = 45) => {
      // Start angle starts at North East (22.5 degrees)
      const startAngle = 360 / 16 
      return (bearing - (startAngle + angle)) * (bearing - (startAngle + angle + offset))
}

export const directionDisplay = (bearing) => {
      if (directionCalculator(bearing, 0) <= 0) return "NE"
      if (directionCalculator(bearing, 45) <= 0) return "E"
      if (directionCalculator(bearing, 90) <= 0) return "SE"
      if (directionCalculator(bearing, 135) <= 0) return "S"
      if (directionCalculator(bearing, 180) <= 0) return "SW"
      if (directionCalculator(bearing, 225) <= 0) return "W"
      if (directionCalculator(bearing, 270) <= 0) return "NW"
      return "N"
}
