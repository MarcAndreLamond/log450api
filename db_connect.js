const Client = require('pg').Client

const client = new Client({
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
