const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
  if (fs.existsSync(envPath)) {
    const rawBuffer = fs.readFileSync(envPath);
    let content = rawBuffer.toString();

    // Check for UTF-16 BOM (0xFF 0xFE or 0xFE 0xFF) or null bytes which indicate UTF-16
    if (rawBuffer.includes('\u0000') || content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
        console.log("Detected distinct encoding/null bytes. Attempting to convert to UTF-8...");
        // Try reading as utf16le which is common for PowerShell output
        content = fs.readFileSync(envPath, 'utf16le');
    }

    // Clean up whitespace and ensure it looks like env file
    content = content.trim();
    
    // Write back as standard UTF-8
    fs.writeFileSync(envPath, content, 'utf8');
    console.log("✅ Converted .env.local to UTF-8.");
    console.log("Content preview (first 20 chars):", content.substring(0, 20).replace(/\n/g, '\\n'));
  } else {
    console.log("❌ .env.local not found.");
  }
} catch (e) {
  console.error("❌ Error fixing file:", e);
}
