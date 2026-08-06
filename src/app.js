const express = require("express");

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const documentRoutes = require("./routes/document.routes");
const ragRoutes = require("./routes/rag.routes");

console.log("authRoutes:", typeof authRoutes);
console.log("aiRoutes:", typeof aiRoutes);
console.log("conversationRoutes:", typeof conversationRoutes);
console.log("messageRoutes:", typeof messageRoutes);
console.log("documentRoutes:", typeof documentRoutes);
console.log("ragRoutes:", typeof ragRoutes);

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/rag", ragRoutes);

module.exports = app;