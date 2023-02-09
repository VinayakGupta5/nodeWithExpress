const crypto = require('crypto');
const mongoose = require('mongoose')

exports.secretKey = () => {
  const tempSecretKey = crypto.createHash('sha256')
    .update(process.env.secretKey)
    .digest('hex');
  const fullSecretKey = Buffer.from(tempSecretKey, 'hex')
  return fullSecretKey
};

exports.encrypt = (data, secretKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + encrypted;
};

exports.decrypt = (encryptedData, secretKey) => {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  encryptedData = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};






