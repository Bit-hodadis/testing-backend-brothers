const { connect } = require("../db/connect/postgresql");
const { resetTokenQuery } = require("../db/updation/update_reset_token");
const { sendEmail } = require("../helper/sendEmail");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const forgetHandler = async (req, res) => {
  const { email } = req.body;

  const secretKey = process.env.TOKENSECRETKEY;

  // Define the payload containing the email and expiration time
  const expire = Math.floor(Date.now() / 1000) + 3 * 60 * 60;

  const payload = {
    email,
  };

  // Sign the token with the payload and secret key
  let client;
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: expire });

    client = await connect();

    const result = await client.query(resetTokenQuery, [token, email]);

    const verificationLink = `http://localhost:3000/auth/verifyToken/?token=${token}`; // Replace with your verification link
    const html = await ejs.renderFile(
      path.join(__dirname, "verificationEmail.ejs"),
      {
        header: "Rest  Your Password ",
        customMessage:
          "Please click the button below to  Reset your  password:",
        verificationLink,
      }
    );

    const isSend = await sendEmail(
      "hodadisbirhan1102@gmail.com",
      email,
      "Reset Password ",
      "",
      html
    );
    return res.status(200).json({ message: "sent" });
  } catch (error) {
    console.log("forget password error", error);
    return res.status(401).json({ message: "Error please try again" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { forgetHandler };
