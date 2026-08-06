const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        originalName: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            default: "",
        },

        pages: {
            type: Number,
            default: 0,
        },

        text: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Document", documentSchema);