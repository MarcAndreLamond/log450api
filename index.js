const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const topic_model = require('./topic_model')

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.listen(port, () => {
  console.log('listening on ' + port);
});

