// Update next.config.js to use ESM export syntax for compatibility with 'type': 'module' in package.json
import path from 'path';

export default {
  // outputFileTracingRoot: process.cwd(),
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'frontend/src');
    return config;
  },
};
