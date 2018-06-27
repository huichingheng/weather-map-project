// const directionDisplay = require('./LocationPointer')

import {distanceCalculator} from './directionDisplay'

test("When wind direction bearing is 0 degress, display 'N'", ()=>{
    expect(distanceCalculator(0)).toBe("N")
})

test("When wind direction bearing is 230 degress, display 'SW'", ()=>{
    expect(distanceCalculator(230)).toBe("SW")
})