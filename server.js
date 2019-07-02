const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminPage = require('./routes/admin.js');
const itempPage = require('./routes/item.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/uploads', express.static('uploads'));

app.use('/admin', adminPage);
app.use('/item', itempPage);


app.listen(3000, function(){
  console.log("Server is running!")
});
