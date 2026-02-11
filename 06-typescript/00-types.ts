export type Company = {
    name: string,
    address: string,
    phone?: string,
}

export type User = {
    readonly name: string
    readonly age: number
    readonly email?: string
    company: Company
    role: "admin" | "user" | "editor"
}
