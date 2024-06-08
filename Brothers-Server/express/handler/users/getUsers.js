const { connect } = require("../../db/connect/postgresql");

const getUsers = async (req, res) => {
  const query =
    "select id,first_name,last_name,email,status,role from  users where role = 'editor'; ";
  let client;
  try {
    const { role } = req?.user;
    if (role !== "admin")
      return res.status(401).json({ message: "No Permision" });

    client = await connect();

    const result = await client.query(query);

    return res.status(200).json({ data: result.rows });
  } catch {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};
module.exports = { getUsers };
