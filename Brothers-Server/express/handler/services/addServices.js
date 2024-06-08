const { connect } = require("../../db/connect/postgresql");

const addServices = async (req, res) => {
  const { title, description, image, category_id } = req.body;
  const token = req?.cookies?.accessToken;
  const { id: user_id } = req?.user;

  console.log(token, "with Credential authorization");
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "insert into services(title,description,image,user_id,category_id) values($1,$2,$3,$4,$5)",
      [title, description, image, user_id, category_id]
    );

    if (result?.rowCount > 0) {
      res.status(200).json({ message: "inserted succefully" });
    } else {
      return res.status(401).json({ message: "Please Try again" });
    }
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

module.exports = { addServices };
