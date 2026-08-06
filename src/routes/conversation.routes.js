console.log("✅ Conversation Routes Loaded");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    createConversation,
    getConversations,
    getConversationById,
    deleteConversation,
} = require("../controllers/conversation.controller");

// Create a new conversation
router.post("/", auth, createConversation);

// Get all conversations of logged-in user
router.get("/", auth, getConversations);

// Get a single conversation
router.get("/:id", auth, getConversationById);

// Delete a conversation
router.delete("/:id", auth, deleteConversation);

module.exports = router;