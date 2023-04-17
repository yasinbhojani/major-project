const mail = require("../utils/mail.util");
const generateRandomOTP = require("../utils/otp.util");
const connection = require("../configs/db.config");

const sendOTP = async (req, res, next) => {
  let OTP = "";
  const { name, email } = req.body;
  const firstName = name.split(" ")[0];

  OTP = generateRandomOTP();

  mail({
    name: firstName,
    email,
    type: "otp",
    otp: OTP,
  })
    .then(() => {
      // storing OTP in a database for future comparision
      connection.query(
        "INSERT INTO otp values (?, ?, now())",
        [OTP, req.body.name],
        (err, data) => {
          if (err) {
            return res.json({
              ok: false,
              message: "An error occured",
            });
          }
          res.status(200).json({ ok: true, message: `OTP sent to ${email}` });
        }
      );
    })
    .catch((err) => {
      res
        .status(401)
        .json({ ok: false, message: "Email not sent, please try again" });
    });
};

const verifyOTP = (req, res, next) => {
  const { otp, name } = req.body;

  connection.query(
    "SELECT * FROM otp WHERE otp = ? AND username = ? ORDER BY time_stamp DESC",
    [otp, name],
    (err, data) => {
      if (err) {
        return res.json({ ok: false, message: "An error occured" });
      }

      if (data.length === 0) {
        return res.json({ ok: false, message: "Invalid OTP" });
      }

      const time = new Date(data[0].time_stamp);
      const now = new Date();

      const diff = now - time;
      if (diff > 10 * 60 * 1000) {
        return res.json({ ok: false, message: "OTP has expired" });
      }

      next();
    }
  );
};

module.exports = {
  sendOTP,
  verifyOTP,
};
