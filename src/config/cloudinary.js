console.log("I AM INSIDE cloudinary.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary object:", cloudinary);
console.log("Uploader:", cloudinary.uploader);
module.exports = cloudinary;