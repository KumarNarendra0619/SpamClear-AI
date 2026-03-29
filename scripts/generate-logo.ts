import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f" />
      <stop offset="100%" stop-color="#112240" />
    </linearGradient>
    <linearGradient id="predator" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64ffda" />
      <stop offset="100%" stop-color="#00b4d8" />
    </linearGradient>
    <linearGradient id="target" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff4d4d" />
      <stop offset="100%" stop-color="#ff8c00" />
    </linearGradient>
    <filter id="glitch">
      <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
  
  <!-- Shield Background -->
  <path d="M256 24 L464 104 L464 264 C464 384 256 488 256 488 C256 488 48 384 48 264 L48 104 Z" fill="url(#bg)" stroke="#00b4d8" stroke-width="12" />
  
  <!-- Glitchy Email Symbol (@) -->
  <g filter="url(#glitch)" transform="translate(230, 230) scale(0.8)">
    <path d="M128 0 C57.3 0 0 57.3 0 128 C0 198.7 57.3 256 128 256 C198.7 256 256 198.7 256 128 L256 104 C256 90.7 245.3 80 232 80 C218.7 80 208 90.7 208 104 L208 128 C208 172.2 172.2 208 128 208 C83.8 208 48 172.2 48 128 C48 83.8 83.8 48 128 48 C172.2 48 208 83.8 208 128 L208 152 C208 165.3 218.7 176 232 176 C245.3 176 256 165.3 256 152 L256 128 C256 57.3 198.7 0 128 0 Z M128 80 C101.5 80 80 101.5 80 128 C80 154.5 101.5 176 128 176 C154.5 176 176 154.5 176 128 C176 101.5 154.5 80 128 80 Z" fill="url(#target)" />
    <!-- Binary noise elements -->
    <rect x="20" y="40" width="10" height="10" fill="#ff4d4d" />
    <rect x="220" y="180" width="15" height="5" fill="#ff8c00" />
    <rect x="180" y="20" width="5" height="15" fill="#ff4d4d" />
  </g>
  
  <!-- Predator Head (Hawk/Wolf stylized) -->
  <path d="M120 180 L220 280 L180 320 L240 340 L280 280 L380 160 L320 140 L260 200 L240 160 Z" fill="url(#predator)" />
  <path d="M140 160 C180 120 240 100 300 120 L260 180 Z" fill="#ffffff" opacity="0.8" />
  <circle cx="220" cy="180" r="12" fill="#ff4d4d" />
  
  <!-- Text -->
  <text x="256" y="440" font-family="sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">SpamClear AI</text>
</svg>
`;

async function generateIcons() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(svgLogo);

  console.log('Generating PNG icons from SVG...');

  try {
    await sharp(svgBuffer).resize(128, 128).png().toFile(path.join(publicDir, 'icon128.png'));
    console.log('Saved public/icon128.png');

    await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'icon48.png'));
    console.log('Saved public/icon48.png');

    await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'icon16.png'));
    console.log('Saved public/icon16.png');

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
