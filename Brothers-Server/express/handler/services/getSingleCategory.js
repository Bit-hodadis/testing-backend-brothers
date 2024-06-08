const { connect } = require("../../db/connect/postgresql");

const getSingleServiceCategory = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const query = `select * from service_category where id=$1`;
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [id]);
    console.log(result);
    return res.status(200).json({ data: result.rows });
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

module.exports = { getSingleServiceCategory };
