const { connect } = require("../db/connect/postgresql");
const { registerUser } = require("../db/insertion/registerUser");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helper/sendEmail");

const registerHandler = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  let client;
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.PASSWORDSECRETKEY)
    );
    // Define your secret key (you should keep this secure)
    const secretKey = process.env.TOKENSECRETKEY;

    // Define the payload containing the email and expiration time
    const expire = Math.floor(Date.now() / 1000) + 4 * 24 * 60 * 60;
    const payload = {
      email,
      role: "editor", // Replace with the email you want to include
    };

    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: expire });
    client = await connect();

    const verificationLink = `http://localhost:3000/auth/verifyEmail/?token=${token}`; // Replace with your verification link
    const html = await ejs.renderFile(
      path.join(__dirname, "verificationEmail.ejs"),
      {
        header: "Verify Your Email Address",
        customMessage:
          "Please click the button below to  Verify your  Email address:",
        verificationLink,
      }
    );

    const isSend = await sendEmail(
      "hodadisbirhan1102@gmail.com",
      email,
      "Verify Email",
      "",
      html
    );

    const result = await client.query(registerUser, [
      first_name,
      last_name,
      email,
      hashedPassword,
      token,
      "admin",
    ]);

    return res.status(201).send("User registered");
  } catch (error) {
    console.log(error);
    return res.status(401).send("error");
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { registerHandler };
