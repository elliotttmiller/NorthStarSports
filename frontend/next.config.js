// Update next.config.js to use ESM export syntax for compatibility with 'type': 'module' in package.json
import path from 'path';

export default {
  // outputFileTracingRoot: process.cwd(),
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      'C:/pagefile.sys',
      'C:/swapfile.sys',
      'C:/hiberfil.sys',
      'C:/System Volume Information',
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');
    return config;
  },
};
