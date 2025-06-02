const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

try {
  const imgDir = path.join(__dirname, 'img');
  const files = fs.readdirSync(imgDir).filter(file => file.toLowerCase().includes('hover') && file.endsWith('.png'));
  
  files.forEach(file => {
    const filePath = path.join(imgDir, file);
    const dimensions = sizeOf(filePath);
    console.log(`${file}: ${dimensions.width}x${dimensions.height} (比例: ${dimensions.width/dimensions.height})`);
  });
} catch (err) {
  console.error('出错了:', err);
} 