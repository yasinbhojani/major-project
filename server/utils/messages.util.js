const generateRandomOTP = require("../utils/otp.util");

const otpMessage = (name, otp) => {
  const html = `
    <p>Dear ${name},</p>
    <br />

    <p>Thank you for choosing Shell. As a security measure, we require you to provide a One-Time Password (OTP) to complete your signup. Please use the following OTP within the next 10 minutes to complete your signup process:</p>
    <br />
    
    <span style="color: blue; font-size:larger;">${otp}</span>
    <br />
    <br />
    
    <p>If you did not request an OTP from Shell, please ignore this email.</p>
    <br />
    
    <p>Sincerely,</p>
    <p>The Shell Team</p>
  `;

  const subject = "Your One-Time Password (OTP) from Shell";

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
