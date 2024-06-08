const { connect } = require("../../db/connect/postgresql");

const updateCompany = async (req, res) => {
  const { name, logo, motto, about, vision, mission, coreValues } = req.body;

  const { id: user_id } = req?.user;
  // const query = `
  //   INSERT INTO company (name, logo, motto, about, mission, vision, coreValues, user_id)
  //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  // `;
  const query = `update company set name=$1,logo=$2,motto=$3,about=$4,mission=$5,vision=$6,coreValues=$7,user_id=$8`;
  let client;
  try {
    client = await connect();

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

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { updateCompany };
