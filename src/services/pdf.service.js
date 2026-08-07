const { getDocument } = require("pdfjs-dist/legacy/build/pdf.mjs");

const extractTextFromPDF = async (buffer) => {
  const data = new Uint8Array(buffer);

  const pdf = await getDocument({
    data,
  }).promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const content = await page.getTextContent();

    text +=
      content.items.map((item) => item.str).join(" ") + "\n";
  }

  return text;
};

module.exports = {
  extractTextFromPDF,
};