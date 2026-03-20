export type Company = {
    name: string,
    address: string,
    phone?: string,
}

type UserId {
    readonly id: string | number
}

type UserBirthDate = {
    birthDate: Date
}

export type User = {
    readonly name: string
    readonly age: number
    readonly email?: string
    company: Company
    role: "admin" | "user" | "editor"
}

export type UserEntity = User & UserId & UserBirthDate
