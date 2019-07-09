const express = require('express');
const router = express.Router();
const db = require('../DB/connector.js');
const cache = require('memory-cache');
const request = require('request')

router.post('/verification', function(req, res) {
  const phone = req.body.phone;

  console.log('[/auth/verification]');
  console.log(phone);
  console.log('');
  const tmp = (Math.random()+'');
  const verificationNumber = tmp[2]+tmp[3]+tmp[4]+tmp[5]+tmp[6]+tmp[7];
  cache.put(phone, verificationNumber, 60*3*1000);

  request({
    method: 'POST',
    json: true,
    uri: 'https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253673265568:woosong-con/messages',
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-auth-key': '2aUYzyYJq3sZokQrZG4y',
      'X-NCP-service-secret': '5d5ce02e59964782ab4b07bcc9a421c9'
    },
    body: {
      type: 'sms',
      contentType:"COMM",
      countryCode:"82",
      from: '01021904621',
      to: [phone],
      content: `인증번호 [${verificationNumber}]입니다.`
    }
  });

  return res.json({ message: "Success" });
});

router.post('/check', function(req, res){
  const code = req.body.code;
  const phone = req.body.phone;

  if (cache.get(phone) == code){
    cache.del(phone);
    res.status(200).json({message:'1'});
  }
  else{
    res.status(401).json({message:'0'});
  }
});

module.exports = router;
