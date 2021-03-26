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

//orders

router.get('/getOrders',async(req, res) => {
  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders.json?status=any";
    const resp = await axios.get(url);
    console.log("orders retrived");
    res.send(resp.data);
    
  } catch (error) {
    console.log(error)
    res.send("error in getting the orders")
  }
})

router.get('/getOneOrder',async(req, res) => {
  const order_id = req.query.id;
  console.log("order_id",order_id);
  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders/"+order_id+".json";
    const resp = await axios.get(url);
    console.log("order retrived");
    res.send(resp.data);
    
  } catch (error) {
    console.log(error)
    res.send("error in getting the order")
  }
})

router.post('/postOrder', async(req, res) => {
  const ord = req.body;
  console.log("order",ord);
  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders.json";
    // var headers = {
    //   'Content-Type': 'application/json'
    // };
    const resp = await axios.post(url,ord);
    console.log("order posted");
    res.send(resp.data);
    
  } catch (error) {
    console.log(error)
    res.send("error in posting the orders")
  }
})

router.delete('/deleteOrder', async(req, res) => {
  const order_id = req.query.id;
  console.log("order_id",order_id);
  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders/"+order_id+".json";
    const resp = await axios.delete(url);
    console.log("order deleted")
    res.send("order Deleted successfully");
  } catch (error) {
    console.log(error);
    res.send("error in deleting the order")

  }
})

router.put('/updateOrder', async(req, res) => {
  // const order_id = req.query.id;
  const orderDetails = req.body;
  const order_id = orderDetails.order.id;

  console.log("orderdetails and id",order_id,orderDetails);
  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders/"+order_id+".json";
    const resp = await axios.put(url,orderDetails);
    console.log("order updated");
    res.send(resp.data);
    
  } catch (error) {
    console.log(error)
    res.send("error in updating the order")
  }
})

//Retrieve inventory levels for a single inventory item

router.get('/inventoryLevel', async(req, res) => {
  // const orderDetails = req.body;
  const id = req.query.id;

  try {
    var url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/inventory_levels.json?inventory_item_ids="+id;
    const resp = await axios.get(url);
    console.log("inventory level");
    res.send(resp.data);
    
  } catch (error) {
    console.log(error)
    res.send("error in getting inventory level")
  }
})


module.exports = router;