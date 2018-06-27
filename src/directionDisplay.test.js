// const directionDisplay = require('./LocationPointer')

import {directionDisplay} from './directionDisplay'

test("When windStrength is greater than", ()=>{
    expect(directionDisplay(0)).toBe("N")
})