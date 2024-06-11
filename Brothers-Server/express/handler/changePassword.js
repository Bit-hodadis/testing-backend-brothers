const { connect } = require("../db/connect/postgresql");
const bcrypt = require("bcryptjs");
const changePassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const { id } = req?.user;

  let client;

  try {
    client = await connect();

    const selectUser = await client.query(
      `select password from users where id=$1`,
      [id]
    );
    const pass = selectUser?.rows[0]?.password;
    console.log("password", pass);
    if (!pass) {
      return res.status(401).json({ message: "error please try agaon!" });
    }
    const secretKey = process.env.PASSWORDSECRETKEY;

    const validPassword = await bcrypt.compare(oldPassword, pass);
    console.log("valid PAssword", validPassword);
    if (!validPassword) {
      return res.status(401).json({ error: "old password is not correct" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, Number(secretKey));

    const updateRsult = await client.query(
      `update users set password=$1 where id=$2`,
      [hashedPassword, id]
    );

    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "error please try again" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = { changePassword };
