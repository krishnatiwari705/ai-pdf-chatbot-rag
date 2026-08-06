const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const embeddingModel = genAI.getGenerativeModel({
    model: "gemini-embedding-001",
});

const generateEmbedding = async (text) => {
    try {
        const result = await embeddingModel.embedContent(text);

        return result.embedding.values;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    generateEmbedding,
};