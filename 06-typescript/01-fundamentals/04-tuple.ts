const person: [string, number] = ["peter", 10]

const [personName, personAge] = person


// 1. Coordinates
type Coordinate = [latitude: number, longitude: number]
const coordinate: Coordinate = [10, 20]
const [lat, lng] = coordinate

// 2. RGB Colors
type RGB = [red: number, green: number, blue: number]
const red: RGB = [255, 0, 0]
const green: RGB = [0, 255, 0]
const blue: RGB = [0, 0, 255]

// 3. Range values
type _Range = [min: number, max: number]
const range: _Range = [1, 10]

// 4. React useState
type CounterState = [number, (value: number) => void]
const counter: CounterState = [0, (value) => console.log(value)]

// 5. Rest parameters
type StringWithRest = [string, ...number[]]
const [text, firstNumber, ...restNumbers]: StringWithRest = ["peter", 1, 2, 3, 4, 5]

// 6. Readonly
type Config = readonly [server: string, port: number]
const config: Config = ["localhost", 3000]
