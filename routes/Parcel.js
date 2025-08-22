const express = require("express");
const ParcelRouter = express.Router();
const Parcel =  ("../models/Parcel");
const { v2: cloudinary } = require("cloudinary");
ParcelRouter.use(express.json());



ParcelRouter.post("/save", async (req, res) => {
  try {
    
    const newItem = new Parcel({
      name: req.body.name,
      price: req.body.price,
      contact: req.body.contact,
    descripition: req.body.descripition,
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

ParcelRouter.get("/get", async (req, res) => {
  try {
    const items = await Parcel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ParcelRouter;
