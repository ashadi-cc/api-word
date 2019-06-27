import { config } from 'dotenv'

//load .env config
config()

//database parameter configuration
export default {
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    user: process.env.DB_USER ? process.env.DB_USER : '',
    password: process.env.DB_PASS ? process.env.DB_PASS : '',
    database: process.env.DB_NAME ? process.env.DB_NAME :'',
    port: 5432,
}