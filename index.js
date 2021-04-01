const { response } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const db = require('./dbManager')
const queryCall = require('./queryConstant')

app.get('/', (req, res) => {
  return res.send('Tracking api use for the application in log450');
});


app.get('/role', (req, res) => {
  const email = req.query.email;
  db.query(queryCall.getUser(email)).then(response => {
    return res.status(200).send({
      userId: response[0].userid,
      email: response[0].email,
      role: response[0].name
    });
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});

app.get('/order', (req, res) => {
  const userid = req.query.userid
  db.query(queryCall.getListOrder(userid)).then(response => {
    return res.status(200).send(response);
  })
    .catch(error => {
      return res.status(500).send(error);
    })
});




app.get('/orderposition', (req, res) => {
  const orderpositionid = req.query.orderpositionid
  db.query(queryCall.getOrderPosition(orderpositionid)).then(response => {
    return res.status(200).send(response);
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

    Promise.all(listPromise).then(response => {
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



