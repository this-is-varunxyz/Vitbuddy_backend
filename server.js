const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");

connectCloudinary();
connectDB();

const routes = require("./routes");
app.use(express.json());
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use("/api/lostandfound", Lostandfound);
app.use("/api/buyandsell", buyAndSellRouter);
app.use("/api/cabshare", cabshareRouter);
app.use("/api/parcel", ParcelRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
