const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function replaceInFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.json')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Header specific change
    if (filePath.endsWith('Header.tsx')) {
      content = content.replace(
        /ALL GUJARAT\s*<\/h1>\s*<p[^>]*>Tours & Travels<\/p>/g,
        `KUTCH JANNAT\n              </h1>\n              <p className="text-xs md:text-sm text-gray-600 font-medium">Tours & Travels</p>\n              <p className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-wider">Services All Gujarat</p>`
      );
    }

    // Hero Section specific change
    if (filePath.endsWith('HeroSection.tsx')) {
      content = content.replace(
        /<span className="text-orange-400">All Gujarat<\/span>/g,
        `<span className="text-orange-400">All Gujarat</span>`
      ); 
    }

    // General text replacements
    content = content.replace(/All Gujarat Travels/g, 'Kutch Jannat Tours and Travels');
    content = content.replace(/ALL GUJARAT TRAVELS/g, 'KUTCH JANNAT TOURS AND TRAVELS');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  } catch (err) {
    console.error('Error processing', filePath, err);
  }
}

try {
  walk(path.join(__dirname, 'src'), replaceInFile);
  console.log('Done');
} catch (err) {
  console.error('Walk error', err);
}
