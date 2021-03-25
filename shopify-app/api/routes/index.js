const express = require('express');
const app = express();
const cookie = require('cookie');
const nonce = require('nonce')();
const request = require('request-promise');
const { access } = require('fs');
const mongoose = require('mongoose');


// const dotenv = require('dotenv').config();
// const crypto = require('crypto');
// const querystring = require('querystring');
// const CryptoJS = require('crypto-js')
// const axios = require('axios');
// const { access } = require('fs');
// const mongoose = require('mongoose');




const route = require('./crud');
const integrate = require('../../integration/db')
const auth = require('../../service/authenticate')


mongoose.connect('mongodb://localhost:27017/Shopify',{useNewUrlParser : true, useUnifiedTopology:true})
mongoose.connection.once('open',() => {
  console.log("MongoDB connection has been made");
}).on('error',function(err) {
  console.error("mongodb connection failed");
});

app.use(express.json())
app.use("/crud",route);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if(shop) {
        const state = nonce();
        const addUrl = auth.addInstallUrl(shop,state);
        res.redirect(addUrl);
    }
 else {
        return res.status(400).send("Shop not found")
    }
});

app.get('/callback',async (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;

    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
    const queryReq = req.query;
    var bool = auth.verifyHmac(shop, hmac, code, queryReq);
             // let flag = crypto.timingSafeEqual(newHmac, hash);
        if(bool) {
            try {
              var response = await auth.getAccessToken(code,shop);
                  const data = {
                    accessToken : response.access_token,
                    scopes : response.scope,
                    name : shop,
                    products :[]
                  }
                  var a2 = await integrate.addToDB(data);
                  if(a2 = "done") {
                    res.send("accessToken added to db");
                  } else {
                    res.send("accessToken saving failed");
                  }
              
            } catch (error) {
              console.log(error);
              res.sendStatus(400);
            }
        }
        else{
          return "HMAC Verification failed";
        } 
    });






app.listen(3000, () => {
  console.log('Listening on port 3000:');
});