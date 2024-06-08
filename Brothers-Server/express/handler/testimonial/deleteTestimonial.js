const { connect } = require("../../db/connect/postgresql");

const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  console.log(id, "...................");

  const query = "delete from testimonials where id = $1";
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [id]);
    console.log("...........", result);

    return res.status(200).json({ message: "successFully Deleted" });
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

module.exports = { deleteTestimonial };
