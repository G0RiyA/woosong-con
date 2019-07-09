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

router.post('/qrcheck', function(req, res){
  let qrdata = req.body.qrdata;

  const selectQuery = "SELECT name FROM stations WHERE id = ?"
  const insertQuery = "UPDATE SET id = ? WHERE name = ?"

  db.query(selectQuery, [qrdata], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(404).send("Invaild QRcode");
    }
    else {
      db.query(select, [0, result[0]], function(err, result){
        if (err) throw err;
        res.stauts(200).send(result[0]);
      });
    }
  });
});

router.post('/register', upload.single('file'), function(req, res){
  let itemname = req.body.itemname;
  let daytime = req.body.daytime;
  let getLocation = req.body.getLocation;
  let storageLocation = req.body.storageLocation;
  let image = req.file.path.split('\\');
  image = image[image.length-1];
  let user   //습득한 유저의 정보를 어떤 유형으로 저장할지 확립해야함.

  const insertQuery = "INSERT INTO queue (itemname, daytime, getLocation, storageLocation, imagePath) VALUES (?, ?, ?, ?, ?)";
  db.query(insertQuery, [itemname, daytime, getLocation, storageLocation, image], function(err, result){
    if(err) throw err;
    res.status(200).send("Register Success");
  });
});


module.exports = router;
