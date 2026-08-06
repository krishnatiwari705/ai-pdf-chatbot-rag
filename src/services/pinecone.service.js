const index = require("../config/pinecone");

const storeEmbeddings = async (vectors) => {
    try {
        await index.upsert(vectors);
        console.log("✅ Vectors uploaded successfully");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const searchEmbeddings = async (embedding, conversationId) => {
    const response = await index.query({
        vector: embedding,
        topK: 3,
        includeMetadata: true,
        filter: {
            conversationId: {
                $eq: conversationId,
            },
        },
    });

    return response.matches;
};

module.exports = {
    storeEmbeddings,
    searchEmbeddings,
};