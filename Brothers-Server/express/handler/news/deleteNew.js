const { connect } = require("../../db/connect/postgresql");

const deleteNew = async (req, res) => {
  const { id } = req.params;

  const query = `delete from news where id = $1`;
  let client;
  try {
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

module.exports = { deleteNew };
