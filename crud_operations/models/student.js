const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNumber : Number,
    name: String,
    branch: String,
    date : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('student', studentSchema)
