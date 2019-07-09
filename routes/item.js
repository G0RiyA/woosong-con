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
  console.log(qrdata);
  console.log('');

  const selectQuery = "SELECT name FROM stations WHERE id = ?"
  const insertQuery = "UPDATE stations SET id = ? WHERE name = ?"

  db.query(selectQuery, [qrdata], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(404).json({message:"Invaild QRcode"});
    }
    else {
      let name = result[0].name;
      db.query(insertQuery, [0, name], function(err, result){
        if (err) throw err;
        res.status(200).json({station:name});
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

  const insertQuery = "INSERT INTO queue (itemname, daytime, getLocation, storageLocation, imagePath, description) VALUES (?, ?, ?, ?, ?, ?)";

  console.log("[/item/register]");
  console.log({'itemname':itemname, 'daytime':daytime, 'getLocation':getLocation, 'storageLocation':storageLocation, 'image':image, 'description':description});
  console.log('');

  db.query(insertQuery, [itemname, daytime, getLocation, storageLocation, image, description], function(err, result){
    if(err) throw err;
    res.status(200).json({message:"Register Success"});
  });
});

router.get('/list', function(req, res){
  console.log("[/item/list]\n");
  const selectQuery = "SELECT * FROM items";
  db.query(selectQuery, [], function(err, result){
    if(err) throw err;
    res.status(200).json({list:result});
  });
});

router.get('/search', function(req, res){
  let query = req.query.query;
  console.log("[/item/search]");
  console.log(query);
  console.log('');

  const selectQuery = "SELECT * FROM items WHERE itemname = ?";
  db.query(selectQuery, ['%'+query+'%'], function(err, result){
    if(err) throw err;
    res.status(200).json({result:result});
  });
});

module.exports = router;
