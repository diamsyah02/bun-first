import conDB from "../../configs/db"
import type { Product } from "./model"
const table = 'products'

export const r_getAll = async () => {
    try {
        return await conDB.select().table(table)
    } catch (e: any) {
        return e.sqlMessage
    }
}

export const r_getDetail = async (id: number) => {
    try {
        return await conDB(table).where('id', id)
    } catch (e: any) {
        return e.sqlMessage
    }
}

export const r_store = async (body: Product) => {
    try {
        return await conDB(table).insert(body)
    } catch (e: any) {
        return e.sqlMessage
    }
}

export const r_update = async (id: number, body: Product) => {
    try {
        return await conDB(table).where('id', id).update(body)
    } catch (e: any) {
        return e.sqlMessage
    }
}

export const r_remove = async (id: number) => {
    try {
        return await conDB(table).where('id', id).del()
    } catch (e: any) {
        return e.sqlMessage
    }
}