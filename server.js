const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');
const multer = require('multer');
const path = require('path')
const pug = require('pug');

const adminPage = require('./routes/admin.js');
const itempPage = require('./routes/item.js');
const authPage = require('./routes/auth.js')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '_' + Math.floor(Math.random()*100000) + path.extname(file.originalname));
  }
});

app.set('view engine','pug');
app.set('views','./views');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(multer({storage : storage}).array('image', 1));

app.use('/uploads', express.static('uploads'));
app.use('/stylesheets/admin.css');

app.use('/admin', adminPage);
app.use('/item', itempPage);
app.use('/auth', authPage)

app.get('/uploads/:id', function(req, res){
  if (!fs.existsSync(__dirname+'/uploads/'+req.params.id)){
    res.status(404).json({message:'Not found'});
    return;
  }
  res.status(200).sendfile(__dirname+'/uploads/'+req.params.id);
});


app.listen(3000, function(){
  console.log("Server is running!")
});
