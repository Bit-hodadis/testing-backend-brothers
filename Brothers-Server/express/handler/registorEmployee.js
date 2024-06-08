const { connect } = require("../db/connect/postgresql");
const { registerEmployeeQuery } = require("../db/insertion/registerEmployee");
const ejs = require("ejs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helper/sendEmail");
const registorEmployee = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const { role, id: user_id } = req?.user;

  if (role !== "admin") {
    return res.status(401).json({ message: "an authorized one" });
  }
  let client;
  try {
    const secretKey = process.env.TOKENSECRETKEY;

    // Define the payload containing the email and expiration time
    const expire = Math.floor(Date.now() / 1000) + 4 * 24 * 60 * 60;
    const payload = {
      email,
      role: "editor", // Replace with the email you want to include
    };

    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: expire });

    const verificationLink = `http://localhost:3000/auth/verifyEmailEmployee/?token=${token}`; // Replace with your verification link
    const html = await ejs.renderFile(
      path.join(__dirname, "verificationEmail.ejs"),
      {
        header: "You are Invited to manage The Brothers IT Web Content",
        customMessage:
          "Please click the button below to  Verify your  Email address: and Set Password",
        verificationLink,
      }
    );

    const isSend = await sendEmail(
      "hodadisbirhan1102@gmail.com",
      email,
      `Hey ${first_name} ${last_name} You are Invited To manage the Brother IT website Content Please Follow the Link It will valid Unit 4 days `,
      "",
      html
    );
    client = await connect();
    const result = await client.query(registerEmployeeQuery, [
      first_name,
      last_name,
      email,
      token,
      user_id,
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

module.exports = { registorEmployee };
