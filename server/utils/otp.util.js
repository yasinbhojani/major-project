const generateRandomOTP = () => {
  let random = 0;
  while (random < 100000) {
    random = Math.floor(Math.random() * 1000000);
  }
  return random.toString();
};

module.exports = generateRandomOTP;
