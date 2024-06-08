const { connect } = require("../../db/connect/postgresql");

const addProfile = async (req, res) => {
  const { name, logo, motto, about, vision, mission, coreValues } = req.body;

  const { id: user_id } = req?.user;
  const query = `
    INSERT INTO company (name, logo, motto, about, mission, vision, coreValues, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  let client;
  try {
    console.log("the Data should Be");
    client = await connect();
    console.log("the Data should Be");
    const result = await client.query(query, [
      name,
      logo,
      motto,
      about,
      mission,
      vision,
      JSON.stringify(coreValues),
      user_id,
    ]);
    console.log("error");

    return res.status(200).json({ message: "success" });
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

module.exports = { addProfile };
