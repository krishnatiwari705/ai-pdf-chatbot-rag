console.log("🔥 THIS IS MY GEMINI SERVICE FILE");
const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (prompt) => {
    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
});
 return response.text;
};



module.exports = {
    generateResponse,
};
console.log("🔥 Exports:", module.exports);