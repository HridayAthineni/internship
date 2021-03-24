const mongoose = require('mongoose');
const {Schema} = mongoose;

const store = new Schema({
    accessToken : String,
    scopes : String,
    name: String,
    products :[]
});


module.exports = mongoose.model('store', store)
