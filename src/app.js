const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const documentRoutes = require("./routes/document.routes");
const ragRoutes = require("./routes/rag.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR-VERCEL-APP.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/rag", ragRoutes);

module.exports = app;