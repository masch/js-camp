import type { User, UserEntity } from "../00-types.ts"

const user: User = {
    name: 'peter',
    age: 10,
    email: "test@test.com",
    company: {
        address: "Umepay",
        name: "BDA",
        phone: "12122"
    },
    role: "admin"
}

const intersectionEntity: UserEntity = {
    id: 1,
    birthDate: new Date("1990-01-01"),
    name: "peter",
    age: 10,
    email: "test@test.com",
    company: {
        address: "Umepay",
        name: "BDA",
        phone: "12122"
    },
    role: "admin"
}

type Dictionary = {
    [key: string]: string
}

const dictionary: Dictionary = {
    a: "1",
    b: "2",
    c: "3"
}