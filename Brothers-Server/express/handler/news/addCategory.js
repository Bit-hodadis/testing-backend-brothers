const { connect } = require("../../db/connect/postgresql");

const addNEwCategory = async (req, res) => {
  const { title } = req.body;
  const { id } = req?.user;
  const token = req?.cookies;
  console.log(token, "with Credential authorization");
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "insert into news_category(title,users_id) values($1,$2)",
      [title, id]
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

module.exports = { addNEwCategory };
