import bcrypt from 'bcrypt'
import conDB from "../../configs/db"
import type { User } from "./model"
const table = 'users'

export const check = async (body: User) => {
    try {
        return await conDB(table).where('username', body.username)
    } catch(e: any) {
        return e.sqlMessage
    }
}

export const store = async (body: User) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(body.password, salt)
        return await conDB(table).insert({ username: body.username, password: password })
    } catch(e: any) {
        return e.sqlMessage
    }
}