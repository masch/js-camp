// ===============
// ANY
// ===============
let anyValue: any = "hello"
anyValue = 10
anyValue = true

const result = anyValue * 2

// Good uses
// 1. Migrating from JavaScript to TypeScript
// 2. Third-party libraries without type definitions

// ===============
// UNKNOWN
// ===============

let unknownValue: unknown = "hello"
unknownValue = 42
unknownValue = true

// Cannot do this
//unknownValue.toFixed(2)
//const reuslt2 = unknownValue * 2

// Type narrowing
// Must check the type before using it
if (typeof unknownValue === "number") {
    const result2 = unknownValue * 2
}

function parseJson(value: string): unknown {
    return JSON.parse(value)
}

const json = parseJson('{"name": "peter", "age": 10}')

if (typeof json === "object" && json !== null) {
    console.log((json as { name: string }).name) // Avoid this forced casting
}

// ===============
// VOID
// ===============

function sayHello(): void {
    console.log("Hello")
}

function logError(message: string): void {
    if (message.length === 0) {
        return undefined
    }

    console.error(message)
}

// ===============
// NEVER
// ===============

function infiniteLoop(): never {
    while (true) {
        console.log("Hello")
    }
}

function throwError(message: string): never {
    throw new Error(message)
}

function checkValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase())
    } else if (typeof value === "number") {
        console.log(value.toFixed(2))
    } else {
        console.log(value)
        // Never is used to check for exhaustive checks
        const _exhaustiveCheck: never = value
        return _exhaustiveCheck
    }
}