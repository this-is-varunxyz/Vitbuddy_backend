const mongoose = require('mongoose');

const cabshareSchema = new mongoose.Schema({
   name: { type: String, required: true },
   contact: { type: String, required: true },
   gender: { type: String, required: true },
   location: { type: String, required: true },
   date: { type: Date, required: true }
});
module.exports = mongoose.model('Cabshare', Cabshare);