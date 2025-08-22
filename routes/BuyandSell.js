const express = require("express");
const buyAndSellRouter = express.Router();
const BuyAndSellModel = require("../models/BuyandSell");
const { v2: cloudinary } = require("cloudinary");
buyAndSellRouter.use(express.json());



buyAndSellRouter.post("/save", async (req, res) => {
  try {
    let imageUrl;
    if (req.body.image) {
      const uploadResult = await cloudinary.uploader.upload(req.body.image, {
        folder: "BuyAndSell",
      });
      imageUrl = uploadResult.secure_url;
    }

    const newItem = new BuyAndSellModel({
      name: req.body.name,
      price: req.body.price,
      image: imageUrl,
      date: req.body.date,
      contact: req.body.contact,
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

buyAndSellRouter.get("/get", async (req, res) => {
  try {
    const items = await BuyAndSellModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = buyAndSellRouter;
