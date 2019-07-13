const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const fs = require('fs');
const path = require('path');

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
      return res.status(404).json({message:"Invaild QRcode"});
    }
    else {
      let name = result[0].name;
      db.query(insertQuery, [0, name], function(err, result){
        if (err) throw err;
        return res.status(200).json({message:name});
      });
    }
  });
});

router.post('/register', function(req, res){
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
    return res.status(200).json({message:"Register Success"});
  });
});

router.get('/list', function(req, res){
  console.log("[/item/list]\n");
  const selectQueryitems = "SELECT * FROM items";
  const selectQueryreserv = "SELECT"
  db.query(selectQueryitems, [], function(err, result){
    if(err) throw err;
    return res.status(200).json({list:result});
  });
});

router.get('/search', function(req, res){
  let query = req.query.query;
  console.log("[/item/search]");
  console.log(query);
  console.log('');

  const selectQuery = "SELECT * FROM items WHERE itemname LIKE ?";
  db.query(selectQuery, ['%'+query+'%'], function(err, result){
    if(err) throw err;
    return res.status(200).json({list:result});
  });
});

router.get('/myreserve', function(req, res){
  let owner = req.query.owner;
  console.log('[/item/myreserve]');
  console.log(owner);
  console.log();

  const selectQuery = "SELECT * FROM reservation WHERE owner = ?";
  db.query(selectQuery, [owner], function(err, result){
    if (err) throw err;
    return res.status(200).json({list:result});
  });
});

router.get('/reserve', function(req, res){
  let no = req.query.no;
  let owner = req.query.owner;
  let comment = req.query.comment;

  console.log('[/item/reserve]');
  console.log(no);
  console.log(owner);
  console.log(comment);
  console.log();

  const selectQuery = "SELECT * FROM items WHERE no = ?";
  const insertQuery = "INSERT INTO reservation VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const deleteQuery = "DELETE FROM items WHERE no = ?"

  db.query(selectQuery, [no], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      return res.status(404).json({message : "Not found"});
    }
    let r = result[0];
    db.query(insertQuery, [r.no, r.itemname, r.daytime, r.getLocation, r.storageLocation, r.imagePath, owner, r.description, comment], function(err, result){
      if (err) throw err;
      db.query(deleteQuery, [no], function(err, result){
        if (err) throw err;
        return res.status(200).json({phone:owner});
      });
    });
  });
});

module.exports = router;
