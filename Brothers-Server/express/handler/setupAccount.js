const bcrypt = require("bcryptjs");
const { connect } = require("../db/connect/postgresql");

const setupPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;
  let client;
  try {
    client = await connect();

    const result = await client.query(`select * from users where email=$1`, [
      email,
    ]);

    const pass = result?.rows?.length > 0 ? result.rows[0] : null;

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
      `update users set password=$1,verify_email_token=null,is_verified=true where email=$2 `,
      [hashedPassword, email]
    );

    console.log(updateResult);

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

module.exports = { setupPassword };
