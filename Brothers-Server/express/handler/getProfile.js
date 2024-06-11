const { connect } = require("../db/connect/postgresql");

const getUserProfile = async (req, res) => {
  const { id } = req?.user;

  const query = "select first_name, last_name, email from users where id=$1";
  let client;
  try {
    client = await connect();
    const result = await client.query(query, [id]);

    return res.status(200).json({ data: result?.rows[0] });
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { getUserProfile };
