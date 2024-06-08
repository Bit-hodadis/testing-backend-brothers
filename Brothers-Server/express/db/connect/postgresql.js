const { pool } = require("../../config/postgresql");

const connect = async () => {
  try {
    const client = await pool.connect();

    console.log("Connected to the database");
    return client;
  } catch (error) {
    console.error("Connection error:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error(
        "Database connection was refused. Is the database running?"
      );
    } else if (error.code === "ETIMEDOUT") {
      console.error(
        "Database connection timed out. Check your network settings."
      );
    }
    throw error;
  }
};

module.exports = { connect };
