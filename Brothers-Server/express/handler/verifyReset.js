const { connect } = require("../db/connect/postgresql");

const verifyReset = async (req, res) => {
  const { email } = req.user;
  const token = req.headers["authorization"];
  let client;
  try {
    client = await connect();
    const result = await client.query(
      `select  * from users where email = $1 and reset_password_token = $2 `,
      [email, token.split(" ")[1]]
    );
    if (result?.rowCount > 0) {
      console.log(result);
      return res.status(200).json({ message: "succes" });
    } else {
      return res.status(401).json({ message: "error" });
    }
  } catch (error) {
    return res.status(401).json({ message: error });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { verifyReset };
