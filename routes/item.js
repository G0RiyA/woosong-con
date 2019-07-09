const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '_' + Math.floor(Math.random()*100000) + path.extname(file.originalname));
  }
});

const upload = multer({storage : storage});

router.get('/qrcheck', function(req, res){
  let qrdata = req.query.qrdata;

  console.log("[/item/qrcheck]");
  console.log(qrcheck);
  console.log('');

  const selectQuery = "SELECT name FROM stations WHERE id = ?"
  const insertQuery = "UPDATE stations SET id = ? WHERE name = ?"

  db.query(selectQuery, [qrdata], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(404).send("Invaild QRcode");
    }
    else {
      let name = result[0].name;
      db.query(insertQuery, [0, name], function(err, result){
        if (err) throw err;
        res.status(200).send(name);
      });
    }
  });
});

router.post('/register', upload.array('image', 1), function(req, res){
  let itemname = req.body.itemname;
  let daytime = req.body.daytime;
  let getLocation = req.body.getLocation;
  let storageLocation = req.body.storageLocation;
  let image = req.files[0].path.split('\\');
  image = image[image.length-1];
  let description = req.body.description

  let insertQuery = "INSERT INTO queue (itemname, daytime, getLocation, storageLocation, imagePath, description) VALUES (?, ?, ?, ?, ?";
  let param = [itemname, daytime, getLocation, storageLocation, image];

  if (description) {
    insertQuery+=',?)';
    param.push(description);
  }
  else {
    insertQuery += ')';
  }

<<<<<<< HEAD
  console.log("[/item/register]");
  console.log(param);
  console.log('');

=======
>>>>>>> 08f9fa2fd21ef78f20aa69e9ea9ec00db842b2c2
  db.query(insertQuery, param, function(err, result){
    if(err) throw err;
    res.status(200).send("Register Success");
  });
});

router.get('/list', function(req, res){
<<<<<<< HEAD
  console.log("[/item/list]\n");
=======
>>>>>>> 08f9fa2fd21ef78f20aa69e9ea9ec00db842b2c2
  const selectQuery = "SELECT * FROM items";
  db.query(selectQuery, [], function(err, result){
    if(err) throw err;
    res.status(200).send(result);
  });
});

router.get('/search', function(req, res){
  let query = req.query.query;
<<<<<<< HEAD
  console.log("[/item/search]");
  console.log(query);
  console.log('');

=======
>>>>>>> 08f9fa2fd21ef78f20aa69e9ea9ec00db842b2c2
  const selectQuery = "SELECT * FROM items WHERE itemname = ?";
  db.query(selectQuery, ['%'+query+'%'], function(err, result){
    if(err) throw err;
    res.status(200).send(result);
  });
});

module.exports = router;
