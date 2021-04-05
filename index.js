const { response } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const db = require('./dbManager')
const queryCall = require('./queryConstant')
const objectFormatter = require('./formatObject')

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
  const deleveryboyId = req.query.deleveryboyId;
  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
  var dateNow = new Date().toISOString().slice(0, 10);
  db.query(queryCall.getOrderPositionList(deleveryboyId)).then(response => {
    let listPromise = [];

    response.forEach(function (val) {
      listPromise.push(db.query(queryCall.modifyOrderPosition(val.orderpositionid, lat, long, dateNow)))
    });

    Promise.all(listPromise).then(r => {
      return res.status(200).send("Position have been modified");
    }).catch(error => {
      return res.status(500).send(error);
    })

  })
    .catch(error => {
      return res.status(500).send(error);
    })


});



app.listen(port, () => {
  console.log('listening on ' + port);
});



