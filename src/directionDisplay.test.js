// const directionDisplay = require('./LocationPointer')

import {direcionDisplay} from './directionDisplay'

test("When wind direction bearing is 0 degress, display 'N'", ()=>{
    expect(direcionDisplay(0)).toBe("N")
})

test("When wind direction bearing is 230 degress, display 'SW'", ()=>{
    expect(direcionDisplay(230)).toBe("SW")
})