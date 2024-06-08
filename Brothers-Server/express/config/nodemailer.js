const nodemailer = require("nodemailer");

const nodemailerConfig = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // secure: false,
  service: "gmail",
  secure: true,
  logger: true,
  debug: true,
  ignoreTLS: true,
  auth: {
    user: "hodadisbirhan80@gmail.com",
    pass: "dvnrpkfcjiekaqgi",
  },
});

module.exports = { nodemailerConfig };
