const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const crypto = require('crypto');


router.post('/login', function(req, res){
  const selectQuery = "SELECT station FROM admin WHERE id = ? AND pw = ?";

  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.pw).digest('base64')).digest('base64');

  db.query(selectQuery, [id, pw], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(401).send("Login Failed");
    }
    else{
      req.session.admin = {
        id : id,
        station : result[0].station
      };
      res.status(200).send("Login Success"); //수행할 명령 수정해야함.
    }
  });
});

router.get('/items', function(req, res){
  if (req.session.admin === undefined){
    res.status(403).send("Permission error");
    return;
  }

  const selectQueryQueue = "SELECT * FROM queue WHERE storageLocation = ?";
  const selectQueryItems = "SELECT * FROM items WHERE storageLocation = ?";

  let que;

  db.query(selectQueryQueue, [req.session.admin.station], function(err, result){
    if (err) throw err;
    que = result;
    db.query(selectQueryItems, [req.session.admin.station], function(err, result){
      if (err) throw err;
      res.status(200).json({
        queue : que,
        items : result
      });
    })
  });
});

router.get('/reservation', function(req, res){
  if (req.session.admin === undefined){
    res.status(403).send("Permission error");
    return;
  }

  const selectQuery = "SELECT * FROM reservation WHERE storageLocation = ?";

  db.query(selectQuery, [req.session.admin.station], function(err, result){
    if (err) throw err;
    res.status(200).json({
      reservations : result
    });
  });
});

router.get('/stationinfo', function(req, res){
  if (req.session.admin === undefined){
    res.status(403).send("Permission error");
  }
  res.status(200).send(req.session.admin.station);
})

router.post('/approval', function(req, res){
  if (req.session.admin === undefined){
    res.status(403).send("Permission error");
    return;
  }

  const selectQueryQueue = "SELECT * FROM queue WHERE no = ?";
  const deleteQueryQueue = "DELETE FROM queue WHERE no = ?";
  const insertQueryItems = "INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?)";

  let no = req.body.no;
  let item;

  db.query(selectQueryQueue, [no], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(404).send("Item not found");
      return;
    }
    item = result[0];
    console.log(result);
    db.query(insertQueryItems, [item.no, item.itemname, item.daytime, item.getLocation, item.storageLocation, item.imagePath, item.user, item.description], function(err, result){
      if (err) throw err;
    });
    db.query(deleteQueryQueue, [no], function(err, result){
      if (err) throw err;
    });
    res.status(200).send("Success");
  });
})

module.exports = router;
