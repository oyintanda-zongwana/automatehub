import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log the current directory structure
console.log('Current directory:', process.cwd());
console.log('__dirname:', __dirname);

// Check various possible paths
const possiblePaths = [
  path.join(__dirname, '../../../frontend/dist'),
  path.join(__dirname, '../../frontend/dist'),
  path.join(__dirname, '../frontend/dist'),
  path.join(process.cwd(), 'frontend/dist'),
  path.join(process.cwd(), '../frontend/dist')
];

console.log('\nChecking possible paths:');
possiblePaths.forEach(p => {
  console.log(`\nPath: ${p}`);
  try {
    const stats = fs.statSync(p);
    console.log('Exists:', true);
    console.log('Is directory:', stats.isDirectory());
    if (stats.isDirectory()) {
      console.log('Contents:', fs.readdirSync(p));
    }
  } catch (err) {
    console.log('Exists:', false);
    console.log('Error:', err.message);
  }
}); 