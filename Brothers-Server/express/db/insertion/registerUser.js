const registerUser =
  "INSERT INTO users (first_name, last_name, email, password,verify_email_token,role) VALUES ($1, $2, $3, $4,$5,$6)";

module.exports = { registerUser };
