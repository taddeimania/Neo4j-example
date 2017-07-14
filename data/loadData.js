'use strict';

const generateRandomRange = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
};

const generateValidIPSegment = () => {
  return generateRandomRange(1, 255);
}

const generateRandomIPAddress = () => {
  const tempIP = [];
  for (let i = 0 ; i < 4 ; i++) {
    tempIP.push(generateValidIPSegment());
  }
  return tempIP.join(".");
}

const generateRandomDomain = () => {
  let domain = "";
  const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0 ; i < 8 ; i++) {
    domain += sample[Math.floor(Math.random() * sample.length)];
  }
  return domain + ".com";
}

const generateXofN = (callback, count) => {
  const output = [];
  for (let i = 0 ; i < count ; i++) {
    output.push(callback());
  }
  return output;
}

module.exports = {
  generateValidIPSegment: generateValidIPSegment,
  generateRandomIPAddress: generateRandomIPAddress,
  generateRandomDomain: generateRandomDomain,
  generateRandomRange: generateRandomRange,
  generateXofN: generateXofN
}
