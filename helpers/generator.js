const generator = require("generate-password");

const pinGenerator = () => {
  return generator.generate({
    length: 6,
    numbers: true,
  });
};

const tokenKey = () => {
  return generator.generate({
    length: 4,
    lowercase: false,
  });
};

module.exports = {
  pinGenerator,
  tokenKey,
};
