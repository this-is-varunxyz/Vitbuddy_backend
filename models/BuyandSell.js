const mongoose = require('mongoose');

const buyAndSellSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   image: { type: String },
   date: { type: Date, required: true },
   contact: { type: String, required: true }
});
module.exports = mongoose.model('BuyandSell', BuyandSell_items);