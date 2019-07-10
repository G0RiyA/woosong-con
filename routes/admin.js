const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const crypto = require('crypto');


router.post('/login', function(req, res){
  const selectQuery = "SELECT station FROM admin WHERE id = ? AND pw = ? AND station = ?";

  console.log(req.body);
  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.pw).digest('base64')).digest('base64');
  let station = req.body.station;

  console.log('[/admin/login]');
  console.log(id);
  console.log(station)
  console.log('');
  db.query(selectQuery, [id, pw, station], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      return res.status(401).send("Login Failed");
    }
    else{
      req.session.admin = {
        id : id,
        station : result[0].station
      };
      return res.status(200).send("Login Success"); //수행할 명령 수정해야함.
    }
  });
});

router.get('/items', function(req, res){
  if (req.session.admin === undefined){
    return res.status(401).send("Not logged in");
  }

  console.log('[/admin/items]');
  console.log(req.session.admin);
  console.log('');

  const selectQueryQueue = "SELECT * FROM queue WHERE storageLocation = ?";
  const selectQueryItems = "SELECT * FROM items WHERE storageLocation = ?";

  let que;

  db.query(selectQueryQueue, [req.session.admin.station], function(err, result){
    if (err) throw err;
    que = result;
    db.query(selectQueryItems, [req.session.admin.station], function(err, result){
      if (err) throw err;
      return res.status(200).json({
        queue : que,
        items : result
      });
    })
  });
});

router.get('/reservation', function(req, res){
  if (req.session.admin === undefined){
    return res.status(401).send("Not logged in");
  }

  console.log('[/admin/reservation]');
  console.log(req.session.admin);
  console.log('');

  const selectQuery = "SELECT * FROM reservation WHERE storageLocation = ?";

  db.query(selectQuery, [req.session.admin.station], function(err, result){
    if (err) throw err;
    return res.status(200).json({
      reservations : result
    });
  });
});

router.get('/stationinfo', function(req, res){
  if (req.session.admin === undefined){
    return res.status(401).send("Not logged in");
  }

  console.log('[/admin/stationinfo]');
  console.log(req.session.admin);
  console.log('');

  return res.status(200).send(req.session.admin.station);
})

router.post('/approval', function(req, res){
  if (req.session.admin === undefined){
    return res.status(401).send("Not logged in");
  }

  console.log('[/admin/approval]');
  console.log(req.session.admin);
  console.log('');

  const selectQueryQueue = "SELECT * FROM queue WHERE no = ?";
  const deleteQueryQueue = "DELETE FROM queue WHERE no = ?";
  const insertQueryItems = "INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?)";

  let no = req.body.no;
  let item;

  db.query(selectQueryQueue, [no], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      return res.status(404).send("Item not found");
    }
    item = result[0];
    db.query(insertQueryItems, [item.no, item.itemname, item.daytime, item.getLocation, item.storageLocation, item.imagePath, item.user, item.description], function(err, result){
      if (err) throw err;
    });
    db.query(deleteQueryQueue, [no], function(err, result){
      if (err) throw err;
    });
    return res.status(200).send("Success");
  });
});

router.post('/canclereserve', function(req, res){
  if (req.session.admin === undefined){
    return req.status(401).send("Not logged in");
  }

  console.log('[/admin/canclereserve]');
  console.log(req.session.admin);
  console.log(req.body.no);
  console.log('')

  const selectQueryReservation = "SELECT * FROM reservation WHERE no = ?";
  const deleteQueryReservation = "DELETE FROM reservation WHERE no = ?";
  const insertQueryItems = "INSERT INTO items VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

  let no = req.body.no;

  db.query(selectQueryReservation, [no], function(err, result){
    if (err) throw err;
    delete result[0].owner;
    delete result[0].comment;
    db.query(insertQueryItems, Object.values(result[0]), function(err, result){
      if (err) throw err;
      db.query(deleteQueryReservation, [no], function(err, result){
        if (err) throw err;
        return res.status(200).send('Success');
      })
    });
  });
});

router.post('/return', function(req, res){
  if (req.session.admin === undefined){
    return res.status(401).send("Not logged in");
  }

  const deleteQueryReservation = "DELETE FROM reservation WHERE no = ?";
  let no = req.body.no;

  console.log('[/admin/return]');
  console.log(req.session.admin);
  console.log(no);
  console.log('');

  db.query(deleteQueryReservation, [no], function(err, result){
    if (err) throw err;

  })
});

module.exports = router;
