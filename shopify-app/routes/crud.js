var express = require('express');
var router = express.Router();
const Store = require('../models/store');
const axios = require('axios');


async function getAccesstoken(store) {
    try {
        const token = await Store.findOne({name: store});
        // console.log("TOKEN.......",token)
        return token.accessToken;
    } catch (error) {
        console.log(error);
        return;
    }
}

// var header = {
//     'Content-Type': 'application/json',
//     'X-Shopify-Access-Token': accessToken
// }

async function addHeaders(shop) {
    var accessToken = await getAccesstoken(shop);
    var header = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken
}
return header;
}

async function endPointGetter(methods, endUrl, header, body) {

    try {
        const response = await axios({
            method : methods,
            url : endUrl,
            headers : header,
            data: body ? body : ""
            })
            return response.data
    } catch (error) {
        return {code:400, message : error}
    }


}

async function addProduct(shop,productDetails) {
    var url = "https://"+ shop + "/admin/api/2021-01/products.json";
    var headers = await addHeaders(shop);
    var res = await endPointGetter("post",url,headers,productDetails)
    console.log(res);
    return res;
}

router.post('/addProduct', async(req,res) => {
    console.log("in add product route");

    var shop = req.query.shop;
    const details = req.body;
    // console.log(req.body);
    console.log(shop, details);
    try {
      const products = await addProduct(shop, details);
      res.send(products)
    } catch (error) {
      return {msg: "Something went wrong"}
    }
  });


// console.log(getAccesstoken("clothing-test2-app.myshopify.com"));
module.exports = router;