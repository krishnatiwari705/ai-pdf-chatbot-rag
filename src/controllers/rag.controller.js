const { generateEmbedding } = require("../services/embedding.service");
const { searchEmbeddings } = require("../services/pinecone.service");
const { generateAnswer } = require("../services/gemini.service");

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const askQuestion = async (req, res) => {
    try {
        const { conversationId, question } = req.body;

        // Validate request
        if (!conversationId || !question) {
            return res.status(400).json({
                success: false,
                message:
                    "Conversation ID and question are required.",
            });
        }

        // Make sure conversation belongs to logged-in user
        const conversation = await Conversation.findOne({
            _id: conversationId,
            user: req.user.id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found.",
            });
        }

        /*
         * SAVE USER MESSAGE
         */
        const userMessage = await Message.create({
            conversation: conversationId,
            role: "user",
            content: question.trim(),
        });

        console.log(
            "User message saved:",
            userMessage._id
        );

        /*
         * Generate embedding for question
         */
        const embedding = await generateEmbedding(
            question
        );

        console.log(
            "Question embedding generated:",
            embedding.length
        );

        /*
         * Search Pinecone
         */
        const matches = await searchEmbeddings(
            embedding,
            conversationId
        );

        console.log(
            "Pinecone matches:",
            matches?.length || 0
        );

        /*
         * If no relevant information is found
         */
        if (!matches || matches.length === 0) {
            const answer =
                "I couldn't find relevant information in the uploaded PDF.";

            const assistantMessage =
                await Message.create({
                    conversation: conversationId,
                    role: "assistant",
                    content: answer,
                });

            console.log(
                "Assistant message saved:",
                assistantMessage._id
            );

            return res.status(200).json({
                success: true,
                answer,
                sources: 0,
            });
        }

        /*
         * Build context from Pinecone results
         */
        const context = matches
            .map(
                (match) =>
                    match.metadata?.text || ""
            )
            .filter(Boolean)
            .join("\n\n");

        /*
         * Generate answer with Gemini
         */
        const answer = await generateAnswer(
            context,
            question
        );

        /*
         * SAVE ASSISTANT MESSAGE
         */
        const assistantMessage =
            await Message.create({
                conversation: conversationId,
                role: "assistant",
                content: answer,
            });

        console.log(
            "Assistant message saved:",
            assistantMessage._id
        );

        /*
         * Automatically rename "New Chat"
         * using the first question.
         */
        if (
            conversation.title === "New Chat" ||
            !conversation.title
        ) {
            let title = question.trim();

            if (title.length > 40) {
                title =
                    title.substring(0, 40) + "...";
            }

            conversation.title = title;

            await conversation.save();

            console.log(
                "Conversation renamed:",
                title
            );
        }

        /*
         * Return answer
         */
        return res.status(200).json({
            success: true,
            answer,
            sources: matches.length,
            conversationTitle:
                conversation.title,
        });

    } catch (error) {
        console.error(
            "RAG Controller Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    askQuestion,
};