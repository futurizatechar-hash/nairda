const sharp = require('sharp');
const fs = require('fs');

async function processLogo(size, outputPath) {
  try {
    const { data, info } = await sharp('public/logo.png')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const cx = info.width / 2;
    const cy = info.height / 2;
    // Shrink radius by 1% to ensure no white anti-aliased border is left from the original square
    const radiusSq = Math.pow((info.width / 2) * 0.98, 2); 
    
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * info.channels;
        const distSq = Math.pow(x - cx, 2) + Math.pow(y - cy, 2);
        
        // If the pixel is outside the strict circle, make it transparent
        if (distSq > radiusSq) {
          data[i + 3] = 0; // Alpha = 0
        }
      }
    }

    let img = sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    });

    if (size) {
      img = img.resize(size, size, { fit: 'contain' });
    }
    
    await img.png().toFile(outputPath);
    console.log(`Processed ${outputPath}`);
  } catch (error) {
    console.error(`Error with ${outputPath}:`, error);
  }
}

async function run() {
  console.log('Processing logos with perfect geometric circular crop...');
  await processLogo(null, 'public/logo.png');
  await processLogo(192, 'public/icons/favicon-192.png');
  await processLogo(512, 'public/icons/favicon-512.png');
  await processLogo(64, 'public/favicon.png');
  console.log('Done!');
}

run();
