const { connect } = require("../../db/connect/postgresql");

const deletePartnership = async (req, res) => {
  const { id } = req.params;

  const query = `delete from stackholders where id = $1`;

  let client;
  try {
    client = await connect();
    const result = await client.query(query, [id]);

    return res.status(200).json({ message: "success full deleted" });
  } catch (error) {
    console.log(error?.message);
    res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};
module.exports = { deletePartnership };
