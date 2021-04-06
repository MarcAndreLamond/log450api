const { response } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const db = require('./dbManager')
const queryCall = require('./queryConstant')
const objectFormatter = require('./formatObject')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  return res.send('Tracking api use for the application in log450');
});


app.get('/role', (req, res) => {
  const email = req.query.email;
  db.query(queryCall.getUser(email)).then(response => {
    return res.status(200).send(objectFormatter.formatUser(response));
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});

app.get('/order', (req, res) => {
  const email = req.query.email;
  const role = req.query.role;
  let query;
  if (role == undefined || role == "customer") {
    query = queryCall.getListOrderUser(email);
  } else if (role == "deliveryboy") {
    query = queryCall.getListOrderUserDelevery(email);
  } else {
    return res.status(500).send(error);
  }

  db.query(query).then(response => {
    return res.status(200).send(objectFormatter.formatOrders(response));
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});




app.get('/orderPosition', (req, res) => {
  const orderPositionId = req.query.orderPositionId;
  db.query(queryCall.getOrderPosition(orderPositionId)).then(response => {
    return res.status(200).send(response[0]);
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});


app.post('/orderPosition', (req, res) => {
  const lat = req.query.pointActualLat;
  const long = req.query.pointActualLong;
  const email = req.query.email;
  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
  var dateNow = new Date().toISOString().slice(0, 10);

  db.query(queryCall.modifyOrderPosition(email, lat, long, dateNow)).then(_ => {
    return res.status(200).send("Position have been modified");
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});


app.post('/order', (req, res) => {
  const byte = req.body.deliveryImage;
  const id = req.query.orderId;

  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
  var dateNow = new Date().toISOString().slice(0, 10);
  db.query(queryCall.modifyOrder(id, dateNow, byte)).then(_ => {
    return res.status(200).send("Order have been modified");
  }).catch(error => {
    return res.status(500).send(error);
  })
});



app.listen(port, () => {
  console.log('listening on ' + port);
});



