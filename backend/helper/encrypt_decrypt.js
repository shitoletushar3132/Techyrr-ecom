const crypto = require("crypto");

// Define a fixed encryption key (32 bytes for AES-256)
const ENCRYPTION_KEY = Buffer.from(
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "hex"
);

// Ensure the key length is 32 bytes
console.log(ENCRYPTION_KEY.length); // Should output 32

// Generate a random IV for encryption
function generateRandomIV() {
  return crypto.randomBytes(16); // For AES-256-CBC, IV is 16 bytes
}

// Encrypt data using AES-256-CBC
function encrypt(data) {
  const iv = generateRandomIV();
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");
  return { iv: iv.toString("base64"), encryptedData };
}

// Decrypt data using AES-256-CBC
function decrypt(encryptedData) {
  if (!encryptedData || !encryptedData.iv || !encryptedData.encryptedData) {
    throw new Error("Invalid encrypted data format");
  }

  const ivBuffer = Buffer.from(encryptedData.iv, "base64");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    ivBuffer
  );
  let decryptedData = decipher.update(
    encryptedData.encryptedData,
    "base64",
    "utf8"
  );
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

module.exports = { encrypt, decrypt };
