const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const CryptoJS = require('crypto-js')




const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_products';
const forwardingAddress = "https://9e98c6271f18.ngrok.io";

function addInstallUrl(shop,state){
    const redirect_uri = forwardingAddress + '/callback';
    const installUrl = "https://" + shop + "/admin/oauth/authorize?client_id=" 
                        + apiKey + "&scope=" + scopes +"&state=" + state+
                        "&redirect_uri=" + redirect_uri;
                        
    res.cookie('state',state);
    return installUrl;
}

function verifyHmac(shop, hmac, code, queryReq) {
    if (shop && hmac && code) {
        const map = Object.assign({},queryReq);
        delete map['hmac'];
        const msg = querystring.stringify(map)
        var hash = CryptoJS.HmacSHA256(msg,apiSecret)

        let flag = false
        if (hmac == hash) {
            flag = true;
        }
        return flag;
}
else {
    return {msg:'Required parameters missing'};
  }
}

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
 

module.exports = { addInstallUrl, verifyHmac, getAccessToken }