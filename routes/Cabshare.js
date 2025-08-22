const express = require("express");
const cabshareRouter = express.Router();
const CabshareModel = require("../models/Cabshare");
cabshareRouter.use(express.json());



cabshareRouter.post("/save", async (req, res) => {
  try {
    const newCabshare = new CabshareModel({
        name: req.body.name,
        contact: req.body.contact, 
        gender: req.body.gender,
        location: req.body.location,
        date: req.body.date,
    });
    await newCabshare.save();
    res.status(201).json(newCabshare);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

cabshareRouter.get("/get", async (req, res) => {
  try {
    const cabshares = await CabshareModel.find();
    res.json(cabshares);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cabshareRouter;
