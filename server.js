const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const fs = require('fs');

const adminPage = require('./routes/admin.js');
const itempPage = require('./routes/item.js');
const authPage = require('./routes/auth.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const session = expressSession({
  secret: 'choih0401_is_stupid',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge : 1000 * 60 * 30
  }
});

app.use(session);

app.use('/uploads', express.static('uploads'));

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
