const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const CryptoJS = require('crypto-js')

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://41d67114fe6d.ngrok.io";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if(shop) {
        const state = nonce();
        const redirect_uri = forwardingAddress + '/shopify/callback';
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

app.get('/shopify/callback', (req, res) => {
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
        var ciphertext = CryptoJS.HmacSHA256()
        let flag = false
        if (msg == ciphertext) {
            flag = true;
        }
    
    
      
        // let flag = crypto.timingSafeEqual(newHmac, hash);
        if(flag) {
            res.status(200).send("HMAC validated")
        }
        else{
            res.status(400).send("HMAC validation failed")

        }

        
    } else {
      res.status(400).send('Required parameters missing');
    }
  });

app.listen(3000, () => {
  console.log('Listening on port 3000:');
});