// Type narrowing



function processId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase())
    } else {
        console.log(id.toFixed(2))
    }
}

function printMessage(message: string | null | undefined) {
    // Truthy check (NOT null and undefined)
    if (message) {
        console.log(message.toUpperCase())
    }
}

// Operator Narrowing


type Fish = {
    swim: () => void
    name: string
}

type Bird = {
    fly: () => void
    name: string
}

type Dog = {
    bark: () => void
    name: string
}

type Animal = Fish | Bird | Dog

function move(animal: Animal) {
    if ("swim" in animal) {
        animal.swim()
    } else if ("fly" in animal) {
        animal.fly()
    } else {
        animal.bark()
    }
}



// Instanceof Narrowing

function formatDate(date: Date | string) {
    if (date instanceof Date) {
        return date.toISOString()
    }

    return new Date(date).toISOString()
}