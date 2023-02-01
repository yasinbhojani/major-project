const otpGenerator = require("otp-generator");

const generateRandomOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};


module.exports = generateRandomOTP;