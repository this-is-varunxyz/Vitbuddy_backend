const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type : {
        type: String,
    enum: ["Lost", "Found"],
    required: true },

item: String,

description: String, 
location: String,
date: String,
image: String,
contactInfo: String,
postedBy: String,

});
module.exports = mongoose.model('Item', itemSchema);