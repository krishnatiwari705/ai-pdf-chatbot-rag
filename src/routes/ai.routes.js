const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { chat } = require("../controllers/ai.controller");

router.post("/chat/:conversationId", auth, chat);

module.exports = router;