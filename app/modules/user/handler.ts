import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { name_jwt, secret_jwt } from '../../configs/constant'
import { login, register } from './service'

const UserHandler = (app: Elysia) =>
    app
    .use(
        jwt({
            name: name_jwt,
            secret: secret_jwt
        })
    )
    .guard({
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    }, (app) => app
        .post('/login', async ({set, body, jwt}) => {
            try {
                const result = await login(body)
                let data = result.data
                if(result.status) {
                    set.status = 200
                    const token = await jwt.sign({
                        id: data.id
                    })
                    set.status = 200
                    data['token'] = token 
                }
                if(!result.status) set.status = 400
                return {
                    msg: result.msg,
                    result: result.data
                }
            } catch(e: unknown) {
                set.status = 500
                return {
                    msg: 'Unable to retrieve items from the database',
                    status: 500
                }
            }
        })
        .post('/register', async ({ set, body }) => {
            try {
                const result = await register(body)
                if(result.status) set.status = 200
                if(!result.status) set.status = 400
                return {
                    msg: result.msg,
                    result: result.data
                }
            } catch(e: unknown) {
                set.status = 500
                return {
                    msg: 'Unable to retrieve items from the database',
                    status: 500
                }
            }
        })
    )

export default UserHandler