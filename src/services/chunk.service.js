const CHUNK_SIZE = 1000;
const OVERLAP = 200;

const createChunks = (text) => {
    const chunks = [];

    for (
        let i = 0;
        i < text.length;
        i += CHUNK_SIZE - OVERLAP
    ) {
        const chunk = text.slice(i, i + CHUNK_SIZE);

        chunks.push(chunk);
    }

    return chunks;
};

module.exports = {
    createChunks,
};