const bcrypt = require("bcryptjs");
const { connect } = require("../db/connect/postgresql");
const {
  selectUsersPasswordByEmail,
} = require("../db/query/selectUsersByEmail");
const resetPassword = async (req, res) => {
  const { email, newPassword, token } = req.body;
  console.log(email, newPassword);
  let client;
  try {
    client = await connect();

    const result = await client.query(selectUsersPasswordByEmail, [email]);

    const pass = result?.rows?.length > 0 ? result.rows[0]?.password : null;

    if (!pass) {
      return res.status(401).json({ message: "Error please try again" });
    }

    // Verify the password
    // const validPassword = await bcrypt.compare(oldPassword, pass);
    // if (!validPassword) {
    //   return res.status(401).json({ error: "oldPassword is not correct" });
    // }
    const secretKey = process.env.PASSWORDSECRETKEY;
    const hashedPassword = await bcrypt.hash(newPassword, Number(secretKey));

    console.log("result");
    const updateResult = await client.query(
      `update users set password=$1,reset_password_token=null where email=$2 and reset_password_token=$3 `,
      [hashedPassword, email, token]
    );

    console.log("result");
    console.log(updateResult);

    return res.status(200).json({ message: "updateResult" });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { resetPassword };
