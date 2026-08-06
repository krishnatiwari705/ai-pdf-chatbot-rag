const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { askDocument } = require("../controllers/rag.controller");

router.post("/ask", auth, askDocument);

module.exports = router;