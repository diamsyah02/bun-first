import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import ProductHandler from './app/modules/product/handler'
import UserHandler from './app/modules/user/handler'

new Elysia()
.use(cors())
.get('/', () => 'Rest Api Bun Elysia')
.use(UserHandler)
.use(ProductHandler)
.listen(3000)