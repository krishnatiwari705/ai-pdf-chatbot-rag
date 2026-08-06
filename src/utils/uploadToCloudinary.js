const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer, folder) => {
    console.log("Function called");
    console.log("Cloudinary uploader:", cloudinary.uploader);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    console.log("Cloudinary Error:", error);
                    return reject(error);
                }

                console.log("Upload Success:", result);
                resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

module.exports = uploadToCloudinary;