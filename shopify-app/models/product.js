const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
    title : String,
    vendor : String,
    product_type : String,
    shop : String,
    product_id : Number
})

module.exports  = mongoose.model('product', productSchema)