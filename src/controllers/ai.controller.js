const { generateResponse } = require("../services/gemini.service");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const chat = async (req, res) => {
    try {
        const { message } = req.body;
        const { conversationId } = req.params;

        // Check if conversation belongs to logged-in user
        const conversation = await Conversation.findOne({
            _id: conversationId,
            user: req.user.id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // Get previous messages
        const previousMessages = await Message.find({
            conversation: conversationId,
        }).sort({ createdAt: 1 });

        // Build prompt with previous conversation
        let prompt = "";

        previousMessages.forEach((msg) => {
            prompt += `${msg.role}: ${msg.content}\n`;
        });

        prompt += `user: ${message}`;

        // Generate AI response
        const aiResponse = await generateResponse(prompt);

        // Save user message
        await Message.create({
            conversation: conversationId,
            role: "user",
            content: message,
        });

        // Save AI response
        await Message.create({
            conversation: conversationId,
            role: "assistant",
            content: aiResponse,
        });

        // Auto rename conversation using first message
        if (conversation.title === "New Chat") {
            conversation.title =
                message.length > 40
                    ? message.substring(0, 40) + "..."
                    : message;

            await conversation.save();
        }

        return res.status(200).json({
            success: true,
            response: aiResponse,
            conversation,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    chat,
};