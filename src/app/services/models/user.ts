export interface User {
    id: string | undefined | null
    fullName: string
    firstName: string
    lastName: string
    email: string
    roles: string[]
    isAdmin: boolean
}
