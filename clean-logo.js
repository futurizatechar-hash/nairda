const sharp = require('sharp');
const fs = require('fs');

async function processLogo(size, outputPath) {
  try {
    const { data, info } = await sharp('public/logo.png')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Make white and light gray pixels completely transparent
      if (r > 230 && g > 230 && b > 230) {
        data[i + 3] = 0; // Set alpha to 0
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
  console.log('Processing logos with sharp pixel manipulation...');
  await processLogo(null, 'public/logo.png'); // Override itself with transparent version
  await processLogo(192, 'public/icons/favicon-192.png');
  await processLogo(512, 'public/icons/favicon-512.png');
  await processLogo(64, 'public/favicon.png');
  console.log('Done!');
}

run();
