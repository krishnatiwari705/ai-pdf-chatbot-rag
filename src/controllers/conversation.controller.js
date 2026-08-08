const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// Create Conversation
const createConversation = async (req, res) => {
    try {
        const { title } = req.body;

        const conversation = await Conversation.create({
            user: req.user.id,
            title: title || "New Chat",
        });

        return res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Conversations
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Conversation
const getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Conversation
const deleteConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // Delete all messages belonging to this conversation
        await Message.deleteMany({
            conversation: req.params.id,
        });

        // Delete the conversation itself
        await Conversation.deleteOne({
            _id: req.params.id,
            user: req.user.id,
        });

        return res.status(200).json({
            success: true,
            message: "Conversation and messages deleted successfully",
        });
    } catch (error) {
        console.error("Delete conversation error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createConversation,
    getConversations,
    getConversationById,
    deleteConversation,
};