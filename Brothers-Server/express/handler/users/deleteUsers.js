const { connect } = require("../../db/connect/postgresql");

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  const { role } = req?.user;

  const query = "delete from users where id=$1";
  let client;
  try {
    if (role !== "admin") {
      return res.status(401).json({ message: " unauthorized" });
    }

    client = await connect();
    const result = await client.query(query, [id]);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { deleteUsers };
