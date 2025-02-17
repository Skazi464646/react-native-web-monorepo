import CryptoJS from "crypto-js";

const SECRET_KEY = "12345678901234567890123456789012"; // 32-byte key
const IV = "1234567890123456"; // 16-byte IV

const keyBytes = CryptoJS.enc.Utf8.parse(SECRET_KEY);
const ivBytes = CryptoJS.enc.Utf8.parse(IV);

export const encryptDataAesCbc = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
    iv: ivBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decryptDataAesCbc = (cipherText) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, keyBytes, {
    iv: ivBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
