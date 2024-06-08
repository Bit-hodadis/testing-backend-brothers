const { connect } = require("../../db/connect/postgresql");

const dashboard = async (req, res) => {
  const query = `select count(*) as num_of_product from products;select count(*) as services from services;select count(*) as news from news;`;
  let client;
  try {
    client = await connect();

    const result = await client.query(query);

    return res.status(200).json({
      product: result[0]?.rows,
      service: result[1]?.rows,
      news: result[2]?.rows,
    });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { dashboard };
