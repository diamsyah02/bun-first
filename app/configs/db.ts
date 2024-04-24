import knex from 'knex'

const option = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'latihan'
    },
    pool: {
        min: 0,
        max: 5
    }
}

const conDB = knex(option)

export default conDB