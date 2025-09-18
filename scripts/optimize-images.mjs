// scripts/optimize-images.mjs
// Professional image optimization for NorthStarSports static assets (ESM version)

import imagemin from 'imagemin';
// Use dynamic import for plugins
import path from 'path';
import fs from 'fs';

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
  const imageminPngquant = (await import('imagemin-pngquant')).default;
  const imageminSvgo = (await import('imagemin-svgo')).default;
  const files = await imagemin(targets, {
    destination: outputDir,
    plugins: [
      imageminPngquant({ quality: [0.7, 0.95] }),
      imageminSvgo({ plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ] }),
    ],
  });
  console.log(`Optimized ${files.length} images to ${outputDir}`);
})();
