const mongoose = require('mongoose');

const Parcel = new mongoose.Schema({
    item:String,
    contact:String,
    price:Number,
    descripition:String
   
});
module.exports = mongoose.model('Parcel', Parcel);