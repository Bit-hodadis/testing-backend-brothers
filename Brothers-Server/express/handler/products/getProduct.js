const { connect } = require("../../db/connect/postgresql");

const getProduct = async (req, res) => {
  const { id } = req.query;
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "select  products.id as id,products.title as title,products.description as description,products.image as image, u.first_name as fname,u.last_name as lname, u.email as email from products left join users as u on products.user_id = u.id where products.id = $1",
      [id]
    );

    return res.status(200).json({ data: result?.rows });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { getProduct };
