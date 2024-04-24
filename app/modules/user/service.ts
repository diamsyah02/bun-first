import bcrypt from 'bcrypt'
import type { User } from "./model"
import { check, store } from "./repository"

export const login = async (body: User) => {
    const result = await check(body)
    if(result.length > 0) {
        const check_pass = bcrypt.compare(body.password, result[0].password)
        if(!check_pass) {
            return {
                msg: 'Login failed, because your password is wrong',
                status: false,
                data: []
            }
        }
        return {
            msg: 'Login success',
            status: true,
            data: result[0]
        }
    } else {
        return {
            msg: 'Login failed, because your username is wrong',
            status: false,
            data: []
        }
    }
}

export const register = async (body: User) => {
    const check_user = await check(body)
    if(check_user.length > 0) {
        return {
            msg: 'Register failed, because user is already exist!',
            status: false,
            data: []
        }
    }
    const result = await store(body)
    return {
        msg: 'Register success',
        status: false,
        data: result
    }
}