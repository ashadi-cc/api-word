import { Pool } from 'pg'
import config from './pgsql'

const pool = new Pool(config)

export default pool