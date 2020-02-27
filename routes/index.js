var express = require('express');
var router = express.Router();
const axios = require('axios');
const request = require('request');
/* GET home page. */
const options = {
  headers : {
    "authority": "voice.bkav.ai",
    "cache-control": "max-age=0",
    "dnt": 1,
    "upgrade-insecure-requests": 1,
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
    "sec-fetch-dest": "document",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "none",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "accept-language": "vi,en-US;q=0.9,en;q=0.8,vi-VN;q=0.7",
    "cookie": "connect.sid=s%3AA8V8J2WEj2m5YTACAHTY0aaEguSClofU.%2Ba52vZOOwARPfXgWoVBWEfkFZhVEMYQdvXcmKaAM4lY",
    "if-none-match": "W/\"1bc-w+AvbVL8W2uNCoQVeKrr4bFuYlM\""
  }
}
const optionsPost = {
  headers: {
    "authority":"voice.bkav.ai",
    "sec-fetch-dest":"empty",
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
    "dnt":1,
    "Content-Type":"application/x-www-form-urlencoded",
    "accept":"*/*",
    "origin":"https:/\/voice.bkav.ai",
    "sec-fetch-site":"same-origin",
    "sec-fetch-mode":"cors",
    "referer":"https:/\/voice.bkav.ai/vi/listen",
    "accept-language":"vi,en-US;q=0.9,en;q=0.8,vi-VN;q=0.7",
    "cookie":"connect.sid=s%3AA8V8J2WEj2m5YTACAHTY0aaEguSClofU.%2Ba52vZOOwARPfXgWoVBWEfkFZhVEMYQdvXcmKaAM4lY",
  }
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/start/hacking/bkav', function(req, res, next) {
  var counter = 0;
    setInterval(function() {
      axios.get('https://voice.bkav.ai/api/v1/vi/clips', options)
          .then(function(response) {
            console.log(response.data[0].id);
            data = {
              "isValid": !(counter % 24)
            }
            var urlVote = 'https://voice.bkav.ai/api/v1/vi/clips/' + response.data[0].id + '/votes';
            axios.post(urlVote,data, optionsPost)
                .then(function(response) {
                  console.log("Vote Response: ", response.data);
                  counter += 1;
                })
                .catch(function(error) {
                  console.log("Call Vote API Error...............",);
                })
          })
          .catch(function(error) {
            console.log("Call Get Document Error...............",);
          })
    }, 10000);

    res.status(200).json({"200": "success"});
});

module.exports = router;
