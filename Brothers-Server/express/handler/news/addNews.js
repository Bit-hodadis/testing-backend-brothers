const { connect } = require("../../db/connect/postgresql");

const addNews = async (req, res) => {
  const { title, content, image, published_date, category_id } = req.body;

  const { id: user_id } = req?.user;
  const token = req?.cookies?.accessToken;
  console.log(token, "with Credential authorization");
  console.log(category_id);
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "insert into news(title,content,image,published_date,category_id,users_id) values($1,$2,$3,$4,$5,$6)",
      [title, content, image, published_date, category_id, user_id]
    );
    console.log(result);
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

module.exports = { addNews };
