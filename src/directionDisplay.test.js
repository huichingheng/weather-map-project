import {directionDisplay} from './directionDisplay'

test("When wind direction bearing is 0 degress, display 'N'", ()=>{
    expect(directionDisplay(0)).toBe("N")
})

test("When wind direction bearing is 230 degress, display 'SW'", ()=>{
    expect(directionDisplay(230)).toBe("SW")
})