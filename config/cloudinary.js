import { v2 as cloudinary } from "cloudinary";
import Dotenv from "dotenv";
Dotenv.config();

function connectCloudinary(Dotenv) {
  cloudinary.config({
    cloud_name: Dotenv.CLOUDINARY_NAME,
    api_key: Dotenv.CLOUDINARY_API_KEY,
    api_secret: Dotenv.CLOUDINARY_SECRET_KEY,
  });
}
export default connectCloudinary;
