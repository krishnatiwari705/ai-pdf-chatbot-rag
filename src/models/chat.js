console.log("🔥 CHAT MODEL FILE LOADED");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        prompt: {
            type: String,
            required: true,
        },

        response: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

console.log("Exporting Chat Model:", Chat.modelName);

module.exports = Chat;