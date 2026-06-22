const sharp = require('sharp');
const fs = require('fs');

async function processLogos() {
  const inputPath = 'public/logo.png';
  const size = 512;
  
  console.log('Reading image...');
  
  // We use a circular SVG mask to keep only the circle and make corners transparent
  const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`;

  const buffer = await sharp(inputPath)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  console.log('Saving resized images...');
  
  // Save as different sizes
  await sharp(buffer).resize(512, 512).toFile('public/icons/favicon-512.png');
  await sharp(buffer).resize(192, 192).toFile('public/icons/favicon-192.png');
  await sharp(buffer).resize(64, 64).toFile('src/app/icon.png');
  
  // Replace original logo.png
  await fs.promises.writeFile('public/logo.png', buffer);
  
  console.log('Logos processed successfully!');
}

processLogos().catch(console.error);
