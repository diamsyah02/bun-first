import type { Product } from './model'
import { r_getAll, r_getDetail, r_remove, r_store, r_update } from './repository'

export const getAll = async () => {
    const result = await r_getAll()
    return result
}

export const getDetail = async (id: number) => {
    const result = await r_getDetail(id)
    return result
}

export const store = async (body: Product) => {
    const result = await r_store(body)
    return result
}

export const update = async (id: number, body: Product) => {
    const result = await r_update(id, body)
    return result
}

export const remove = async (id: number) => {
    const result = await r_remove(id)
    return result
}