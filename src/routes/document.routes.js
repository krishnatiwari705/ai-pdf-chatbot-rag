const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");

const { uploadDocument } = require("../controllers/document.controller");

// Upload PDF
router.post("/upload", auth, upload.single("file"), uploadDocument);

module.exports = router;