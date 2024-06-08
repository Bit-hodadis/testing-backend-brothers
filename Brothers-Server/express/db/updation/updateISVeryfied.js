const updateIsVerified =
  "UPDATE users SET is_verified = true,verify_email_token=null  WHERE email = $1 and is_verified = $2";

module.exports = { updateIsVerified };
