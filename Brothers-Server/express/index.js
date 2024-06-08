const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { router } = require("./router");

const cookieParser = require("cookie-parser");
const { connect } = require("./db/connect/postgresql");
const { testimonialsTable } = require("./db/CreateTable/testimonials");
const { createTables } = require("./helper/createTable");

const app = express();

app.use(
  cors({
    origin: "*",

    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", router);
const port = 5000;

// createTables()
//   .then((value) => {
//     console.log("table created successfull", value);
//   })
//   .catch((error) => {
//     console.log("table creation error", error);
//   });

app.get("/", async (req, res) => {
  // const client = await connect();
  // const data = await client.query("delete from company");
  // console.log(data, "...............");
  res.send("Hello World! dddddd ss");
});

createTables();

app.listen(5000, async () => {
  console.log(`Example app listening f at http://localhost:${port}`);
});
