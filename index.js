const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const db = require('./db_connect')

app.get('/', (req, res) => {
  return res.send('Tracking api use ');
});

app.listen(port, () => {
  console.log('listening on ' + port);
});

