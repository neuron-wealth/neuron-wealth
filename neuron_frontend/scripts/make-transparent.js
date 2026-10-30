const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// CRC32 implementation for PNG chunks
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

const inputPath = path.resolve(__dirname, '../public/images/family-office-process-wheel.png');
const outputPath = path.resolve(__dirname, '../public/images/family-office-process-wheel.png');

if (!fs.existsSync(inputPath)) {
  console.error('Input file not found:', inputPath);
  process.exit(1);
}

const buf = fs.readFileSync(inputPath);
let pos = 8;
let width = 0;
let height = 0;
const idatChunks = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

console.log(`Image dimensions: ${width}x${height}`);

const rawData = zlib.inflateSync(Buffer.concat(idatChunks));
const bytesPerPixel = 4;
const stride = 1 + width * bytesPerPixel;

// Unfilter scanlines to get raw RGBA
const pixels = Buffer.alloc(width * height * 4);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y++) {
  const filter = rawData[y * stride];
  const rowOffset = y * stride + 1;
  const prevRowOffset = (y - 1) * stride + 1;

  for (let x = 0; x < width * bytesPerPixel; x++) {
    const rawVal = rawData[rowOffset + x];
    let val = rawVal;
    const a = x >= bytesPerPixel ? pixels[y * width * 4 + x - bytesPerPixel] : 0;
    const b = y > 0 ? pixels[(y - 1) * width * 4 + x] : 0;
    const c = (x >= bytesPerPixel && y > 0) ? pixels[(y - 1) * width * 4 + x - bytesPerPixel] : 0;

    if (filter === 1) { // Sub
      val = (rawVal + a) & 0xff;
    } else if (filter === 2) { // Up
      val = (rawVal + b) & 0xff;
    } else if (filter === 3) { // Average
      val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    } else if (filter === 4) { // Paeth
      val = (rawVal + paeth(a, b, c)) & 0xff;
    }
    pixels[y * width * 4 + x] = val;
  }
}

// Flood fill from borders to turn background white pixels into transparent
const visited = new Uint8Array(width * height);
const queue = [];

function isWhiteish(x, y) {
  const idx = (y * width + x) * 4;
  const r = pixels[idx];
  const g = pixels[idx + 1];
  const b = pixels[idx + 2];
  // Check if near white (threshold > 240)
  return r > 238 && g > 238 && b > 238;
}

// Seed all perimeter pixels that are white-ish
for (let x = 0; x < width; x++) {
  if (isWhiteish(x, 0)) { queue.push((0 << 16) | x); visited[x] = 1; }
  if (isWhiteish(x, height - 1)) { queue.push(((height - 1) << 16) | x); visited[(height - 1) * width + x] = 1; }
}
for (let y = 0; y < height; y++) {
  if (!visited[y * width] && isWhiteish(0, y)) { queue.push((y << 16) | 0); visited[y * width] = 1; }
  if (!visited[y * width + width - 1] && isWhiteish(width - 1, y)) { queue.push((y << 16) | (width - 1)); visited[y * width + width - 1] = 1; }
}

let head = 0;
while (head < queue.length) {
  const item = queue[head++];
  const x = item & 0xffff;
  const y = item >>> 16;

  // Make pixel transparent
  const pIdx = (y * width + x) * 4;
  pixels[pIdx + 3] = 0; // Alpha = 0

  // 4 neighbors
  const neighbors = [
    [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
  ];

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = neighbors[i];
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const vIdx = ny * width + nx;
      if (!visited[vIdx] && isWhiteish(nx, ny)) {
        visited[vIdx] = 1;
        queue.push((ny << 16) | nx);
      }
    }
  }
}

// Also soften/feather pixels bordering transparent
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const pIdx = (y * width + x) * 4;
    if (pixels[pIdx + 3] !== 0) {
      const r = pixels[pIdx];
      const g = pixels[pIdx + 1];
      const b = pixels[pIdx + 2];
      if (r > 225 && g > 225 && b > 225) {
        // Check if any neighbor is transparent
        const hasTransNeighbor = 
          pixels[((y-1)*width + x)*4 + 3] === 0 ||
          pixels[((y+1)*width + x)*4 + 3] === 0 ||
          pixels[(y*width + x-1)*4 + 3] === 0 ||
          pixels[(y*width + x+1)*4 + 3] === 0;
        if (hasTransNeighbor) {
          const brightness = (r + g + b) / 3;
          const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * (255 / 30))));
          pixels[pIdx + 3] = alpha;
        }
      }
    }
  }
}

// Re-encode scanlines with filter 0 (none)
const outRaw = Buffer.alloc(height * stride);
for (let y = 0; y < height; y++) {
  outRaw[y * stride] = 0; // Filter: None
  pixels.copy(outRaw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
}

const compressedIdat = zlib.deflateSync(outRaw, { level: 9 });

// Build new PNG
const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // Bit depth
ihdrData[9] = 6; // RGBA
ihdrData[10] = 0; // Deflate
ihdrData[11] = 0; // Filter
ihdrData[12] = 0; // Interlace

const ihdrChunk = makeChunk('IHDR', ihdrData);
const idatChunk = makeChunk('IDAT', compressedIdat);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync(outputPath, finalPng);
console.log(`Successfully made background transparent and wrote to: ${outputPath} (${finalPng.length} bytes)`);
