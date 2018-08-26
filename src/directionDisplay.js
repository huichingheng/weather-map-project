const compass = {
      NORTH: "N",
      NORTH_EAST: "NE",
      EAST: "E",
      SOUTH_EAST: "SE",
      SOUTH: "S",
      SOUTH_WEST: "SW",
      WEST: "W",
      NORTH_WEST: "NW"
}

const directionCalculator = (bearing, angle, offset = 45) => {
      // Start angle starts at North East (22.5 degrees)
      const startAngle = 360 / 16 
      return (bearing - (startAngle + angle)) * (bearing - (startAngle + angle + offset))
}

export const directionDisplay = (bearing) => {
      if (directionCalculator(bearing, 0) <= 0) return compass.NORTH_EAST
      if (directionCalculator(bearing, 45) <= 0) return compass.EAST
      if (directionCalculator(bearing, 90) <= 0) return compass.SOUTH_EAST
      if (directionCalculator(bearing, 135) <= 0) return compass.SOUTH
      if (directionCalculator(bearing, 180) <= 0) return compass.SOUTH_WEST
      if (directionCalculator(bearing, 225) <= 0) return compass.WEST
      if (directionCalculator(bearing, 270) <= 0) return compass.NORTH_WEST
      return compass.NORTH
}
