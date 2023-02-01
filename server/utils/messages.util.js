const generateRandomOTP = require("../utils/otp.util");

const otpMessage = (name) => {
  const html = `
    <p>Hey ${name},</p>
    <p>Welcome to Shell!</p>
    <p>Before we get started, Authenticate your email with the given OTP,</p>

    <p>
      <b>OTP:</b>
    </p>
    <span style="color: blue; font-size:larger; font-weight: bold;">${generateRandomOTP()}</span>
  `;

  const subject = "Please verify your Email address";

  return { html, subject };
};

const welcomeMessage = (name) => {
  const html = `
    <p>Hey ${name},</p>
    <p>Welcome to Shell !</p>
    <p>
      We're so glad you're here. My name is Soham, I will guide you through this Platform.
    </p>
    <p>
      Shell Is a platform where you can connect with your friends, share your opinion or you can upload your photos or videos here. Shell has a chat feature where you can chat with your friends.
    </p>
    <p>
      We also provide News Page where you can read the latest news from diffrent sources.
    </p>
    <p>Feel free to reach out if you have any questions or feedback.</p>
    <p>
      Shell is an open source platform. You can access the code
      <a href="https://github.com/yasinbhojani/major-project">here</a>
    </p>
    
    <p>Regards, Team Shell. 🐚</p>
  `;

  const subject = "Welcome to Shell";

  return { html, subject };
};

module.exports = { otpMessage, welcomeMessage };
