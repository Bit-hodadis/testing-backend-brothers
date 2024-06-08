const { connect } = require("../../db/connect/postgresql");

const createPartnership = async (req, res) => {
  const { name, logo, type } = req.body;
  const query = `insert into stackholders(name,logo,type,user_id) values($1,$2,$3,$4)`;
  const { id: user_id } = req?.user;
  let client;
  try {
    client = await connect();

    const result = await client.query(query, [name, logo, type, user_id]);

    return res.status(200).json({ message: "successfully inserted" });
  } catch (error) {
    console.log(error?.message);
    return res.status(401).json({ message: "Error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { createPartnership };
