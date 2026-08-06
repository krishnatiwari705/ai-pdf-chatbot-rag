const Message = require("../models/Message");

const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({
            conversation: conversationId,
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getMessages,
};