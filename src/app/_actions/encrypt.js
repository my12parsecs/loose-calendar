import crypto from "crypto";

const SECRET_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // AES requires a 16-byte IV

export function encrypt(text){
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

export function decrypt(encryptedText) {
    if(encryptedText.startsWith('{"type":"doc",')) return encryptedText
    const parts = encryptedText.split(":");
    const iv = Buffer.from(parts[0], "base64");
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
