const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: 'tdxrnoebtaizge',
  host: 'ec2-34-195-233-155.compute-1.amazonaws.com',
  database: 'd98gcros9ht79n',
  password: '0fd50636a315277c7f9b3bf6ba8b13447ccf3652b62d5fe929f2448d1a0ad15f',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


const query = (query) => {
  return new Promise(function (resolve, reject) {
    pool.connect((error, client, release) => {
      if (error) {
        reject('Error acquiring client', error.stack)
        return
      }
      client.query(query, (error, results) => {
        release()
        if (error) {
          reject(error);
          return;
        }
        resolve(results.rows);
      })
    })
  })
}

module.exports = {
  query
}
