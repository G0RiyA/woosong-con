const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const crypto = require('crypto');

const selectQuery = "SELECT * FROM admin WHERE id = ? AND pw = ?";

router.post('/login', function(req, res){
  console.log(req.body);
  let id = req.body.id;
  let pw = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.pw).digest('base64')).digest('base64');

  db.query(selectQuery, [id, pw], function(err, result){
    if (err) throw err;
    if (result.length === 0){
      res.status(401).send("Login Failed");
    }
    else{
      res.status(200).send("Login Success"); //수행할 명령 수정해야함.
    }
  });
});

module.exports = router;
