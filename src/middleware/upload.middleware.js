console.log("I AM INSIDE upload.middleware.js");
const multer = require("multer");


const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

console.log("Upload middleware loaded");
console.log(upload);

module.exports = upload;