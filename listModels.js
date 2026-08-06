const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

console.log("1. Starting...");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

console.log("2. AI Client Created");

async function main() {
    try {
        console.log("3. Listing models...");

        const models = await ai.models.list();

        console.log("4. Got models:", models);

        for await (const model of models) {
            console.log(model.name);
        }

        console.log("5. Finished");
    } catch (error) {
        console.error("ERROR:");
        console.error(error);
    }
}

main();