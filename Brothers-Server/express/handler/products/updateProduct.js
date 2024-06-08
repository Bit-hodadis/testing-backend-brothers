const { connect } = require("../../db/connect/postgresql");

const updateProduct = async (req, res) => {
  const { id, title, description, image } = req.body;
  const { id: user_id } = req?.user;

  const query = `update products set title=$1,description=$2,image=$3,user_id=$4  where id = $5`;
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [
      title,
      description,
      image,
      user_id,
      id,
    ]);

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

module.exports = { updateProduct };
