const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'node_modules', '@angular', 'cdk', 'platform');
const targetFile = path.join(targetDir, 'index.js');

try {
  if (fs.existsSync(targetDir) && !fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, "module.exports = require('../bundles/cdk-platform.umd.js');\n", 'utf8');
    console.log('[postinstall] Created @angular/cdk/platform/index.js successfully.');
  }
} catch (err) {
  console.warn('[postinstall] Warning creating platform shim:', err.message);
}
