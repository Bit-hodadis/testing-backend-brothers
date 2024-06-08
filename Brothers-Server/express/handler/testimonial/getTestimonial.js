const { connect } = require("../../db/connect/postgresql");

const getTestimonial = async (req, res) => {
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "SELECT t.id as id, t.description as description, s.logo as logo, s.name as name FROM testimonials AS t LEFT JOIN stackholders AS s ON s.id = t.client_id"
    );
    console.log(result?.rows);
    return res.status(200).json({ data: result?.rows });
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

module.exports = { getTestimonial };
