const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const CryptoJS = require('crypto-js')
const axios = require('axios');
const { access } = require('fs');
const mongoose = require('mongoose');

const Store = require('./models/store');
const indexRouter = require('./routes/crud');



const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_products';
const forwardingAddress = "https://b4d67c462af3.ngrok.io";


mongoose.connect('mongodb://localhost:27017/Shopify',{useNewUrlParser : true, useUnifiedTopology:true})
mongoose.connection.once('open',() => {
  console.log("MongoDB connection has been made");
}).on('error',function(err) {
  console.error("mongodb connection failed");
});

// app.use("/",indexRouter);
app.use(express.json())
app.use("/crud",indexRouter);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if(shop) {
        const state = nonce();
        const redirect_uri = forwardingAddress + '/callback';
        const installUrl = "https://" + shop + "/admin/oauth/authorize?client_id=" 
                            + apiKey + "&scope=" + scopes +"&state=" + state+
                             "&redirect_uri=" + redirect_uri;
                            
        res.cookie('state',state);
        // console.log(installUrl);
        res.redirect(installUrl);
  
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
  
    if (shop && hmac && code) {
        const map = Object.assign({},req.query);
        // console.log(map);
        delete map['hmac'];
        const msg = querystring.stringify(map)
        var hash = CryptoJS.HmacSHA256(msg,apiSecret)

        let flag = false
        if (hmac == hash) {
            flag = true;
        }
        
        // let flag = crypto.timingSafeEqual(newHmac, hash);
        if(flag) {
            // res.status(200).send("HMAC validated")
            try {
              var response = await getAccessToken(code,shop);
              // console.log(response);
              const data = {
                accessToken : response.access_token,
                scopes : response.scope,
                name : shop,
                products :[]
              }
              var a2 = await addToDB(data);
              // console.log(data);
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
          return "Verification failed";
        } 
    } else {
      res.status(400).send('Required parameters missing');
    }
  });

  async function getAccessToken(code,shop) {
    try {
      const response = await axios({
        method: 'post',
        url: "https://"+shop+"/admin/oauth/access_token",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data : {
          client_id: apiKey,
          client_secret: apiSecret,
          code: code
        }
      });
      // console.log(response.data,"RESPONSE DATA");
      return response.data;
    } catch (error) {
      console.log(error);
      return{code:400,message:"Requesting access token failed"};
    }
  }

  async function addToDB(data) {
    // console.log("in add to db",data);
    var store = new Store(data);
              try {
                const a1 = await store.save();
                console.log("Access token saved to DB");

                return "done";
              } catch (error) {
                return {msg: "Access token not saved into DB"}

              }
  }



app.listen(3000, () => {
  console.log('Listening on port 3000:');
});