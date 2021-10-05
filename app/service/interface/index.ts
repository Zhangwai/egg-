export interface createUser {
    username: string,
    password?: string,
    email?: string,
    phone?: string,
    gender?: number,
    uuid?: string
}
export interface resourceInterface {
    id: number,
    name: string,
    parent_id: number,
    children: resourceInterface[]
}
export interface setBody {
    roleId: number,
    resourceIds?: number[],
    userIds?: number[]
}