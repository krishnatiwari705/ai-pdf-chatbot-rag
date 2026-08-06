const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { getMessages } = require("../controllers/message.controller");

router.get("/:conversationId", auth, getMessages);

module.exports = router;