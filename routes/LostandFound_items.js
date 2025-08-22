const express = require("express");
const Lostandfound = express.Router();
const Item = require("./models/Item");

import { v2 as cloudinary } from "cloudinary";
Lostandfound.use(express.json());
// Assuming the model is in the models directory



Lostandfound.post("/save", async (req, res) => {
  try {
    if (req.body.image) {
      const imageUrl = await cloudinary.uploader.upload(req.body.image, {
        folder: "LostAndFound",
      });
    }

    const newitem = new Item({
      type: req.body.type,
      item: req.body.item,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      image: imageUrl.secure_url,
      contactInfo: req.body.contactInfo,
      postedBy: req.body.postedBy,
    });
    await newitem.save();
    res.status(201).json(newitem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // Logic to handle item creation
  res.send("Item created");
});

Lostandfound.get("/get", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = Lostandfound;
