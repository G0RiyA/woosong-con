const mysql = require('mysql');
const db = {
  host: 'localhost',
  port: 29292,
  user: 'woosong',
  password: 'hoicha',
  database: 'woosong'
};

var connector;
function handleDisconnect(){
  connector = mysql.createConnection(db);

  connector.connect(function(err){
    if(err){
      console.log('ConnectingError : ', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connector.on('error', function(err){
    console.log('DBError : ', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleDisconnect();
    }
    else{
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connector;
