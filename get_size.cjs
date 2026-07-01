const fs = require('fs');
const buffer = fs.readFileSync('public/images/eins.webp');
// WebP header parsing to get width/height
if (buffer.toString('utf8', 8, 12) === 'WEBP') {
    const chunkHeader = buffer.toString('utf8', 12, 16);
    if (chunkHeader === 'VP8 ') {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        console.log(`Dimensions: ${width}x${height} (VP8)`);
    } else if (chunkHeader === 'VP8X') {
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        console.log(`Dimensions: ${width}x${height} (VP8X)`);
    } else if (chunkHeader === 'VP8L') {
        const b0 = buffer[21];
        const b1 = buffer[22];
        const b2 = buffer[23];
        const b3 = buffer[24];
        const width = 1 + (((b1 & 0x3F) << 8) | b0);
        const height = 1 + (((b3 & 0xF) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6));
        console.log(`Dimensions: ${width}x${height} (VP8L)`);
    } else {
        console.log('Unknown WEBP format');
    }
}
