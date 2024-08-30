function decrypt(data) {
  return "Decrypted data";
}
function read(data) {
  const decrypted = decrypt(data);
  console.log(`Reading decrypted data: ${decrypted}`);
  return decrypted;
}

export {
  read
};