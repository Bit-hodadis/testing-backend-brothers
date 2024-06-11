const { connect } = require("../db/connect/postgresql");

const changeUserProfile = async (req, res) => {
  const { first_name, last_name } = req.body;
  const { id } = req.user;
  const query = "update users set first_name=$1,last_name=$2 where id=$3";

  let client;
  try {
    client = await connect();
    const result = client.query(query, [first_name, last_name, id]);
    return res.status(200).json({ message: "updated" });
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

module.exports = { changeUserProfile };
