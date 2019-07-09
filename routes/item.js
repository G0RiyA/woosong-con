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

  const insertQuery = "INSERT INTO queue (itemname, daytime, getLocation, storageLocation, imagePath) VALUES (?, ?, ?, ?, ?)";

  console.log(itemname)

  db.query(insertQuery, [itemname, daytime, getLocation, storageLocation, image], function(err, result){
    if(err) throw err;
    res.status(200).send("Register Success");
  });
});

router.get('/list', function(req, res){
  const selectQuery = "SELECT * FROM item";
  db.query(selectQuery, [], function(err, result){
    if(err) throw err;
    res.status(200).send(result);
  });
});

router.get('/search', function(req, res){
  let query = req.query.query;
  const selectQuery = "SELECT * FROM item WHERE itemname = ?";
  db.query(selectQuery, ['%'+query+'%'], function(err, result){
    if(err) throw err;
    res.status(200).send(result);
  });
});

module.exports = router;
