const mongoose = require('mongoose');
const {Schema} = mongoose;


const orderSchema = new Schema({
    order_id :Number,
    admin_graphql_api_id: String,
    app_id: Number,
    confirmed: Boolean,
    contact_email: String,
    created_at: String,
    currency: String,
    current_subtotal_price: String,
    current_total_price: String,
    financial_status: String,
    order_number: Number,
    phone: Number,
    line_items: [],
    tax_lines : [],
    transactions : []
           
})

module.exports  = mongoose.model('Order', orderSchema)