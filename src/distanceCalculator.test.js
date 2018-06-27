import {distanceCalculator} from './distanceCalculator'

test("Distance between 2 points (5,9) and (2,5) should be 5", ()=>{
    expect(distanceCalculator(5,2,9,5)).toBe(5)
})
