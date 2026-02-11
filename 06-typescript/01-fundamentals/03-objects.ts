import type { User } from "../00-types.ts"
// type User = {
//     name: string
//     age: number
// }

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