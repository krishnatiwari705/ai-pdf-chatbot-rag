const { generateEmbedding } = require("../services/embedding.service");
const { searchEmbeddings } = require("../services/pinecone.service");
const { generateResponse } = require("../services/gemini.service");

const askDocument = async (req, res) => {
    try {
        const { question, conversationId } = req.body;

        const questionEmbedding = await generateEmbedding(question);

        const matches = await searchEmbeddings(
            questionEmbedding,
            conversationId
        );

        const context = matches
            .map((match) => match.metadata.text)
            .join("\n\n");

        const prompt = `
Use the following context to answer the user's question.

Context:
${context}

Question:
${question}

Answer:
`;

        const answer = await generateResponse(prompt);

        res.status(200).json({
            success: true,
            answer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    askDocument,
};