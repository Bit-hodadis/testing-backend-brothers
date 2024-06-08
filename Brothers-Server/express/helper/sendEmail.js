const { nodemailerConfig } = require("../config/nodemailer");

const sendEmail = async (from, to, subject, text, html) => {
  const mailOption = {
    from,
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    nodemailerConfig.sendMail(mailOption, (error, info) => {
      if (error) {
        return reject({ status: 400, data: error });
      } else {
        return resolve({ status: 200, data: info.response });
      }
    });
  });
};

module.exports = { sendEmail };
