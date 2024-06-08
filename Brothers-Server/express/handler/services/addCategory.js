const { connect } = require("../../db/connect/postgresql");

const addServiceCategory = async (req, res) => {
  const { title, description, image } = req.body;

  const { id: user_id } = req.user;
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "insert into service_category(title,description,image,user_id) values($1,$2,$3,$4)",
      [title, description, image, user_id]
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

module.exports = { addServiceCategory };
