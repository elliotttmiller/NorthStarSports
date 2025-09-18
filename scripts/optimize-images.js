// scripts/optimize-images.js
// Professional image optimization for NorthStarSports static assets

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const path = require('path');
const fs = require('fs');

const targets = [
  'frontend/public/logos/nba/*.png',
  'frontend/public/logos/nba/*.svg',
  'frontend/public/logos/nfl/*.png',
  'frontend/public/logos/nfl/*.svg',
  'frontend/src/assets/images/*.{png,jpg,jpeg,svg}',
];

const outputDir = 'frontend/public/logos/optimized';

(async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const files = await imagemin(targets, {
    destination: outputDir,
    plugins: [
      imageminPngquant({ quality: [0.7, 0.95] }),
      imageminSvgo({ plugins: [{ removeViewBox: false }] }),
    ],
  });
  console.log(`Optimized ${files.length} images to ${outputDir}`);
})();
