var express = require('express');
var router = express.Router();
const axios = require('axios')

const Store = require('../../models/store');
const integrate = require('../../integration/db')






async function addHeaders(shop) {
    var accessToken = await integrate.getAccesstoken(shop);
    var header = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken
}
return header;
}



router.get('/getProduct', async(req,res) => {
  // console.log("in get product");
    var shop = req.query.shop;
    try {
       
          var url = "https://"+ shop + "/admin/api/2021-01/products.json";
          var headers = await addHeaders(shop);
          // console.log(url);
          const resp = await axios.get(url,{headers});
          // console.log("response in get", resp);
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
      console.log("product created");
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
    console.log("product retrived");
    res.send(resp.data);
  } catch (error) {
    console.log(error)
    
  }
})

router.put('/updateProduct', async(req,res) => {
  var shop = req.query.shop;
  var newDetails = req.body;
  var product_id = newDetails.product.id;
  try {
    var url = "https://"+ shop + "/admin/api/2021-01/products/"+product_id+".json";
    var headers = await addHeaders(shop);
    const resp = await axios.put(url,newDetails,{headers});
    console.log("product updated");
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
    console.log("product deleted")
    res.send("product Deleted successfully");
  } catch (error) {
    console.log(error)
    
  }
})


module.exports = router;