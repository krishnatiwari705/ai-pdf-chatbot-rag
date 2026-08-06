const fs = require("fs");
const { getDocument } = require("pdfjs-dist/legacy/build/pdf.mjs");

const extractTextFromPDF = async (filePath) => {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await getDocument({ data }).promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const content = await page.getTextContent();

        const pageText = content.items
            .map(item => item.str)
            .join(" ");

        text += pageText + "\n";
    }

    return text;
};

module.exports = {
    extractTextFromPDF,
};