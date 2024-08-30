function encrypt(data) {
  return "Encrypted data";
}

function send(url, data) {
  const encDta = encrypt(data);
  console.log(`Sending encrypted data to ${url}`); 
}

export {
  send
};