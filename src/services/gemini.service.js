const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
});

const generateAnswer = async (context, question) => {
    const prompt = `
You are a helpful AI assistant.

Answer ONLY using the context below.

If the answer is not present in the context, reply:
"I couldn't find the answer in the uploaded document."

Context:
${context}

Question:
${question}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

module.exports = {
    generateAnswer,
};