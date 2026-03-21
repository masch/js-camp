// ===============
// Functions
// ===============

function sum(a: number, b: number): number {
    return a + b
}

const sumArrow = (a: number, b: number): number => a + b


// ===============
// Optional parameters
// ===============


function sayHello(name: string, age?: number): string {
    if (age) {
        return `Hello ${name}, you are ${age} years old`
    }
    return `Hello ${name}`
}

// ===============
// Default parameters
// ===============

function greet(name: string, greeting: string = "Hello") {
    return `${greeting}, ${name}`
}


// ===============
// Rest parameters
// ===============

function sumAll(...numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0)
}
sumAll(1, 2, 3, 4, 5)
sumAll(1, 2)


// =====================
// Function types
// =====================

type MathOperation = (a: number, b: number) => number

const divide: MathOperation = (a, b) => a / b
const multiply: MathOperation = (a, b) => a * b


