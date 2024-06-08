const { connect } = require("../../db/connect/postgresql");
const { sendEmail } = require("../../helper/sendEmail");

const createContactUS = async (req, res) => {
  const { email, name, phone, message } = req.body;
  console.log(req.body);

  const query = `insert into contact_us(email,name,phone,message) values($1,$2,$3,$4)`;
  let client;
  try {
    client = await connect();
    const result = await client.query(query, [email, name, phone, message]);

    const isSend = await sendEmail(
      email,
      "hodadisbirhan1102@gmail.com",
      `From Contact US Name: ${name}  Phone: ${phone}`,
      message
    );

    return res.status(200).json({ message: "successfull" });
  } catch (error) {
    return res.status(401).json({ message: "error" });
    console.log(error);
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { createContactUS };
