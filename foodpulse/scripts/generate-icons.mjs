import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = path.join(__dirname, '../public/foodpulse-logo.png');
const publicDir = path.join(__dirname, '../public');

// Icon sizes needed for web app
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateIcons() {
  console.log('Starting icon generation...\n');

  try {
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    // Get image metadata
    const metadata = await sharp(inputFile).metadata();
    console.log(`Source image: ${metadata.width}x${metadata.height}\n`);

    // Generate all icon sizes
    for (const { size, name } of iconSizes) {
      const outputPath = path.join(publicDir, name);

      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-resolution)
    console.log('\nGenerating favicon.ico...');
    const publicFaviconPath = path.join(publicDir, 'favicon.ico');
    const appFaviconPath = path.join(__dirname, '../src/app/favicon.ico');

    // For .ico, we'll generate a 96x96 version (largest size)
    await sharp(inputFile)
      .resize(96, 96, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(publicFaviconPath);

    // Copy to src/app/favicon.ico (Next.js automatically uses this location)
    fs.copyFileSync(publicFaviconPath, appFaviconPath);

    console.log('✓ Generated favicon.ico (public/ and src/app/)');

    console.log('\n✨ All icons generated successfully!');
    console.log('\nGenerated files:');
    iconSizes.forEach(({ name }) => console.log(`  - ${name}`));
    console.log('  - favicon.ico');

  } catch (error) {
    console.error('Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
