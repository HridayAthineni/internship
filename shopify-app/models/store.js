const mongoose = require('mongoose');
const {Schema} = mongoose;

const storeSchema = new Schema({
    accessToken : String,
    scopes : String,
    name: String,
    products :[]
});

module.exports = mongoose.model('store', storeSchema)

// const Store = mongoose.model('Store', storeSchema)


// module.exports = {
//     'Store': Store,
//     'Product': Product,
//     'Order' : Order

// }
