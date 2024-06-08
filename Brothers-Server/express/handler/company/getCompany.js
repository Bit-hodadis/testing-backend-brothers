const { connect } = require("../../db/connect/postgresql");

const getCompany = async (req, res) => {
  const query = "SELECT * FROM company;";
  let client;
  try {
    client = await connect();
    const result = await client.query(query);

    return res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching company data:", err);

    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { getCompany };
