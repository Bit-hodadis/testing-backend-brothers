const { connect } = require("../../db/connect/postgresql");

const changeStatus = async (req, res) => {
  const { status, id } = req.body;

  const disable = "update users set status=$1 where id = $2";
  const { role } = req?.user;
  let client;
  try {
    if (role !== "admin") {
      return res.status(401).json({ message: " unauthorized" });
    }
    client = await connect();
    const result = await client.query(disable, [status, id]);

    return res.status(200).json({ message: "succesfully" });
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

module.exports = { changeStatus };
