const { connect } = require("../../db/connect/postgresql");

const getNew = async (req, res) => {
  const { id } = req.query;

  const token = req?.cookies;
  console.log(token, "with Credential authorization");
  let client;
  try {
    client = await connect();
    const result = await client.query(
      "select news.id as id, news.title as title,news.content as content,news.image as image, TO_CHAR(news.published_date, 'YYYY-MM-DD')   as published_date, u.first_name as fname,u.last_name as lname, u.email as email,cat.title as cat_title, cat.id as cat_id from news left join users as u on news.users_id = u.id left join news_category as cat on news.category_id = cat.id where  news.id = $1",
      [id]
    );

    return res.status(200).json({ data: result?.rows });
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

module.exports = { getNew };
