const { connect } = require("../../db/connect/postgresql");

const getNEwCategory = async (req, res) => {
  const token = req?.cookies;
  console.log(token, "with Credential authorization");
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "select u.first_name as fname,u.last_name as lname, u.email as email,cat.title as title, cat.id as id from news_category as  cat left join users as u on cat.users_id = u.id "
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

module.exports = { getNEwCategory };
