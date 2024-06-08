const resetTokenQuery = `update users set reset_password_token = $1 where email = $2`;

module.exports = { resetTokenQuery };
