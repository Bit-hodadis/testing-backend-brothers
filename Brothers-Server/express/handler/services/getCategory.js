const { connect } = require("../../db/connect/postgresql");

const getServiceCategory = async (req, res) => {
  const query = `select * from service_category`;
  let client;
  try {
    client = await connect();

    const result = await client.query(query);

    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { getServiceCategory };
