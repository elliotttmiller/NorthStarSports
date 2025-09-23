// scripts/optimize-images.mjs
// Professional image optimization for NorthStarSports static assets (ESM version)

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import glob from 'glob';

const targets = [
  'frontend/public/logos/nba/*.png',
  'frontend/public/logos/nba/*.svg',
  'frontend/public/logos/nfl/*.png',
  'frontend/public/logos/nfl/*.svg',
  'frontend/src/assets/images/*.{png,jpg,jpeg,svg}',
];

const outputDir = 'frontend/public/logos/optimized';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  let total = 0;
  for (const pattern of targets) {
    const files = glob.sync(pattern);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const outFile = path.join(outputDir, path.basename(file));
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        await sharp(file)
          .toFormat('png')
          .png({ quality: 90 })
          .toFile(outFile);
        total++;
      } else if (ext === '.svg') {
        fs.copyFileSync(file, outFile);
        total++;
      }
    }
  }
  console.log(`Optimized ${total} images to ${outputDir}`);
})();
