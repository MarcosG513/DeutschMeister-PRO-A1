const Jimp = require('jimp');
const fs = require('fs');

async function cropIcon() {
  try {
    const srcPath = 'C:\\Users\\mgmog\\.gemini\\antigravity-ide\\brain\\0d035407-9f44-443b-8104-c0c42b4eaa8e\\deutschmeister_app_icon_1782163277581.png';
    const image = await Jimp.read(srcPath);
    
    console.log('Original size:', image.bitmap.width, image.bitmap.height);
    
    // Crop top-left quadrant (x: 0, y: 0, w: 512, h: 512)
    image.crop(0, 0, 512, 512);
    
    // Resize to 1024x1024 because capacitor-assets prefers large icons
    image.resize(1024, 1024);
    
    const assetsDir = 'assets';
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
    }
    
    await image.writeAsync('assets/icon.png');
    await image.writeAsync('assets/splash.png');
    
    console.log('Cropped successfully and saved to assets/icon.png and assets/splash.png');
  } catch (error) {
    console.error('Error cropping image:', error);
  }
}

cropIcon();
