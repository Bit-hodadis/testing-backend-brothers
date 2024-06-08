const { connect } = require("../../db/connect/postgresql");

const getService = async (req, res) => {
  const token = req?.cookies;
  const { id } = req.query;
  console.log(token, "with Credential authorization");
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "select  services.id as id,category_id as cat_id,cat.title as cat_title,services.title as title,services.description as description,services.image as image, u.first_name as fname,u.last_name as lname, u.email as email from services left join users as u on services.user_id = u.id left join service_category as cat on services.category_id = cat.id where services.id = $1 ",
      [id]
    );

    return res.status(200).json({ data: result?.rows });
  } catch (error) {
    return res.status(401).json({ message: "error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { getService };
