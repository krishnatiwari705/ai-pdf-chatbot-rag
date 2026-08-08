const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const documentRoutes = require("./routes/document.routes");
const ragRoutes = require("./routes/rag.routes");

const app = express();

/*
 * CORS
 *
 * Allow localhost and Vercel deployments.
 * origin: true reflects the request's Origin header,
 * which handles Vercel production/preview URLs.
 */
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/*
 * Explicitly handle preflight requests.
 */
app.options("*", cors());

app.use(express.json());

/*
 * Routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/rag", ragRoutes);

/*
 * Health check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI PDF Chatbot API is running",
  });
});

module.exports = app;