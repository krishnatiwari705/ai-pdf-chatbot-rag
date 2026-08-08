const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

const Document = require("../models/Document");
const Conversation = require("../models/Conversation");

const { extractTextFromPDF } = require("../services/pdf.service");
const { generateEmbedding } = require("../services/embedding.service");
const { storeEmbeddings } = require("../services/pinecone.service");

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF.",
            });
        }

        const { conversationId } = req.body;

        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required.",
            });
        }

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

        // Extract PDF text
        const text = await extractTextFromPDF(req.file.buffer);

        console.log("Text Length:", text.length);
        console.log("Extracted Text:");
        console.log(text);

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "No text found inside PDF.",
            });
        }

        // Save document
        const document = await Document.create({
    user: req.user.id,
    conversation: conversationId,

    // Use original filename since memoryStorage has no filename
    fileName: req.file.originalname,

    originalName: req.file.originalname,

    // No local file path with memoryStorage
    fileUrl: "",

    text,
});

        // Split text
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
        });

        const chunks = await splitter.splitText(text);

        console.log("Chunks:", chunks.length);

        const vectors = [];

        for (let i = 0; i < chunks.length; i++) {
            console.log(`Processing Chunk ${i + 1}/${chunks.length}`);

            const embedding = await generateEmbedding(chunks[i]);

            console.log("Embedding Length:", embedding.length);

            vectors.push({
                id: `${document._id}-${i}`,
                values: embedding,
                metadata: {
                    text: chunks[i],
                    documentId: document._id.toString(),
                    conversationId,
                    userId: req.user.id,
                },
            });
        }

        console.log("Vectors:", vectors.length);

        if (vectors.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No vectors generated.",
            });
        }
        console.log("====================");
console.log("TEXT LENGTH:", text.length);
console.log("CHUNKS:", chunks.length);
console.log("VECTORS:", vectors.length);
console.log("====================");

        await storeEmbeddings(vectors);

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully.",
            totalChunks: chunks.length,
            document,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadDocument,
};