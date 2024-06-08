const { connect } = require("../../db/connect/postgresql");

const subscribe = async (req, res) => {
  const { email } = req.body;

  const query = `insert into subscriptions(email) values($1)`;
  let client;
  try {
    client = await connect();
    const result = await client.query(query, [email]);

    return res.status(200).json({ message: "subscriberd" });
  } catch (error) {
    return res.status(401).json({ message: error });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { subscribe };
