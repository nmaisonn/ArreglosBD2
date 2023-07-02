const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  //host: '192.168.64.5',
  //user: 'postgres',
  //port: 5432,
  //password: 'sofia',
  //database: 'Proyecto_bd2'
})

pool.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to DB!')
  }
})

module.exports = pool
