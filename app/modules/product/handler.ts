import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { getAll, getDetail, remove, store, update } from './service'
import { name_jwt, secret_jwt } from '../../configs/constant'

const ProductHandler = (app: Elysia) =>
    app
    .use(
        jwt({
            name: name_jwt,
            secret: secret_jwt
        })
    )
    .onBeforeHandle(async ({jwt, headers, set}) => {
        let auth = headers.authorization?.substr(7)
        const verif = await jwt.verify(auth)
        if(!verif) {
            set.status = 401
            return {
                msg: 'Invalid Token!',
                result: []
            }
        }
    })
    .get('/product', async ({set}) => {
        try {
            const result = await getAll()
            set.status = 200
            return {
                msg: 'Get data product success',
                result: result
            }
        } catch (e: unknown) {
            set.status = 500
            return {
                msg: 'Unable to retrieve items from the database'
            }
        }
    })
    .get('/product/:id', async ({set, params}) => {
        try {
            const result = await getDetail(+params.id)
            set.status = 200
            return {
                msg: 'Get data product success',
                result: result
            }
        } catch (e: unknown) {
            set.status = 500
            return {
                msg: 'Unable to retrieve items from the database'
            }
        }
    })
    .delete('/product/:id', async ({set, params}) => {
        try {
            const result = await remove(+params.id)
            set.status = 200
            return {
                msg: 'Delete data product success',
                result: result
            }
        } catch (e: unknown) {
            set.status = 500
            return {
                msg: 'Unable to retrieve items from the database'
            }
        }
    })
    .guard({
        body: t.Object({
            name: t.String(),
            qty: t.Integer(),
            price: t.Integer()
        })
    }, (app) => app
        .post('/product', async ({set, body}) => {
            try {
                const result = await store(body)
                set.status = 200
                return {
                    msg: 'Insert data product success',
                    result: result
                }
            } catch (e: unknown) {
                set.status = 500
                return {
                    msg: 'Unable to retrieve items from the database'
                }
            }
        })
        .put('/product/:id', async ({set, params, body}) => {
            try {
                const result = await update(+params.id, body)
                set.status = 200
                return {
                    msg: 'Update data product success',
                    result: result
                }
            } catch (e: unknown) {
                set.status = 500
                return {
                    msg: 'Unable to retrieve items from the database'
                }
            }
        })
    )


export default ProductHandler