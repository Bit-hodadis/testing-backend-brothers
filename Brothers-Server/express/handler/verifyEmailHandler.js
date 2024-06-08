const { connect } = require("../db/connect/postgresql");
const { updateIsVerified } = require("../db/updation/updateISVeryfied");

const verifyEmailHandler = async (req, res) => {
  const { user } = req;
  const { email } = user;
  let client;
  try {
    client = await connect();
    const result = await client.query(updateIsVerified, [email, false]);
    console.log(result);
    if (result.rowCount > 0)
      return res.status(200).send("Email verification successful");
    else res.status(404).send("User not found or Verifieng Error");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { verifyEmailHandler };
