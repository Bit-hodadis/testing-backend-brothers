const { connect } = require("../../db/connect/postgresql");

const getPartnership = async (req, res) => {
  let tempQuery = null;
  const { type } = req.query;
  const query1 =
    "select s.id as id, s.name as name,s.logo as logo, u.first_name as fname,u.last_name as lname, s.type as type from stackholders as s left join users  as u on s.user_id = u.id;";

  const query2 = `
  SELECT s.id, s.name 
  FROM stackholders AS s 
  WHERE s.type = 'client' 
     OR s.type = 'both';
`;

  tempQuery = type ? query2 : query1;
  let client;
  try {
    client = await connect();
    const result = await client.query(tempQuery);
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

module.exports = { getPartnership };
