const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    askQuestion,
} = require("../controllers/rag.controller");

router.post(
    "/ask",
    auth,
    askQuestion
);

module.exports = router;