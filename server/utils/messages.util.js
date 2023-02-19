const generateRandomOTP = require("../utils/otp.util");

const otpMessage = (name, otp) => {
  const html = `
    <h2>Hey ${name},</h2>
    <h2>Welcome to Shell!</h2>
    <p>Before we get started, Confirm your email with the given OTP,</p>

    <span style="color: blue; font-size:larger; font-weight: bold;">${otp}</span>
  `;

  const subject = "Please verify your Email address";

  return { html, subject };
};

const welcomeMessage = (name) => {
  const html = `
    <h3>Hey ${name},</h3>
    <h3>Welcome to Shell!</h3>
    <p>
      We're so glad you're here. My name is Soham, I will guide you through this Platform.
    </p>
    <p>
      Shell Is a platform where you can connect with your friends, share your opinions and upload your photos or videos. Shell has a realtime chat where you can chat with your friends. We also provide News Page where you can read the latest news from diffrent sources.
    </p>
    <p>Feel free to reach out if you have any questions or feedback. Shell is an open source platform. You can access the code
      <a href="https://github.com/yasinbhojani/major-project">here</a>
    </p>
    
    <p>
      Regards, 
      Team Shell 🐚
    </p>
  `;

  const subject = "Welcome to Shell";

  return { html, subject };
};

module.exports = { otpMessage, welcomeMessage };
