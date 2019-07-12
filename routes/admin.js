const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const crypto = require('crypto');

router.get('/items', function(req, res){
  if (req.query.station === undefined){
    return res.status(400).send("Bad request")
  }

  console.log('[/admin/items]');
  console.log(req.query.station);
  console.log('');

  const selectQueryQueue = "SELECT * FROM queue WHERE storageLocation = ?";
  const selectQueryItems = "SELECT * FROM items WHERE storageLocation = ?";

  let que;

  db.query(selectQueryQueue, [req.query.station], function(err, result){
    if (err) throw err;
    que = result;
    db.query(selectQueryItems, [req.query.station], function(err, result){
      if (err) throw err;
      return res.status(200).json({
        queue : que,
        items : result
      });
    })
  });
});

router.get('/reservation', function(req, res){
  if (req.query.station === undefined){
    return res.status(400).send("Bad request")
  }

  console.log('[/admin/reservation]');
  console.log('');

  const selectQuery = "SELECT * FROM reservation WHERE storageLocation = ?";

  db.query(selectQuery, [req.query.station], function(err, result){
    if (err) throw err;
    return res.status(200).json({
      reservations : result
    });
  });
});

router.post('/approval', function(req, res){
  console.log('[/admin/approval]');
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
  console.log('[/admin/canclereserve]');
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
  const deleteQueryReservation = "DELETE FROM reservation WHERE no = ?";
  let no = req.body.no;

  console.log('[/admin/return]');
  console.log(no);
  console.log('');

  db.query(deleteQueryReservation, [no], function(err, result){
    if (err) throw err;
    return res.status(200).send('Success');
  })
});

module.exports = router;
