var express = require('express');
var router = express.Router();
const axios = require('axios')

const Store = require('../models/store');



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


async function addHeaders(shop) {
    var accessToken = await getAccesstoken(shop);
    var header = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken
}
return header;
}



router.get('/getProduct', async(req,res) => {
    var shop = req.query.shop;
    try {
       
          var url = "https://"+ shop + "/admin/api/2021-01/products.json";
          var headers = await addHeaders(shop);
          const resp = await axios.get(url,{headers});
          res.send(resp.data);
}
catch(err) {
    console.log(err);
}
})

router.post("/addProduct", async(req,res) => {
    const shop = req.query.shop;
    const details = req.body;
    try {
      var url = "https://"+ shop + "/admin/api/2021-01/products.json";
      var headers = await addHeaders(shop);
      const resp = await axios.post(url,details,{headers:headers});
      console.log("In add product method",resp);
      res.send(resp.data)
    } catch (error) {
      console.log(error)
    }


})

router.get('/getOneProduct', async(req, res) => {
  var shop = req.query.shop;
  var product_id= req.body.id;

  try {
    var url = "https://"+ shop + "/admin/api/2021-01/products/"+product_id+".json";
    var headers = await addHeaders(shop);
    const resp = await axios.get(url,{headers});
    // console.log(resp.data)
    res.send(resp.data);
  } catch (error) {
    console.log(error)
    
  }
})

router.put('/updateProduct', async(req,res) => {
  var shop = req.query.shop;
  var newDetails = req.body;
  var product_id = newDetails.product.id;
  console.log("product_id",product_id);
  try {
    var url = "https://"+ shop + "/admin/api/2021-01/products/"+product_id+".json";
    var headers = await addHeaders(shop);
    const resp = await axios.put(url,newDetails,{headers});
    console.log("updated");
    res.send(resp.data);

  }
  catch(error){
    console.log(error)

  }

})

router.delete('/deleteProduct', async(req, res) => {
  var shop = req.query.shop;
  var product_id= req.body.id;
  try {
    var url = "https://"+ shop + "/admin/api/2021-01/products/"+product_id+".json";
    var headers = await addHeaders(shop);
    const resp = await axios.delete(url,{headers});
    console.log("deleted")
    res.send("product Deleted successfully");
  } catch (error) {
    console.log(error)
    
  }
})


module.exports = router;