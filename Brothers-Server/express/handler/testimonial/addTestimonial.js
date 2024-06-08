const { connect } = require("../../db/connect/postgresql");

const addTestimonial = async (req, res) => {
  const { description, client_id } = req.body;
  const { id: user_id } = req?.user;

  const query =
    "insert into  testimonials(description,user_id,client_id) values($1,$2,$3)";
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [description, user_id, client_id]);

    return res.status(200).json({ message: "successfull inserted" });
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

module.exports = { addTestimonial };
