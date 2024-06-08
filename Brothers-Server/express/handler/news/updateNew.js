const { connect } = require("../../db/connect/postgresql");

const updateNew = async (req, res) => {
  const { id, title, content, image, published_date, category_id } = req.body;
  const { id: user_id } = req?.user;
  const query = `update news set title=$1,content=$2,image=$3,users_id=$4,published_date=$5,category_id=$6  where id = $7`;
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [
      title,
      content,
      image,
      user_id,
      published_date,
      category_id,
      id,
    ]);

    return res.status(200).json({ message: "success" });
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

module.exports = { updateNew };
