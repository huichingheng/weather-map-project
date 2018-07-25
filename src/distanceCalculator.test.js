import {distanceCalculator} from './distanceCalculator'

test("Distance between 2 points (5,9) and (2,5) should be greater than 0", ()=>{
    expect(distanceCalculator(5,2,9,5)).toBeGreaterThan(0)
})
