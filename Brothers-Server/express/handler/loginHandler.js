const { connect } = require("../db/connect/postgresql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginHandler = async (req, res) => {
  let client;
  try {
    const secretKey = process.env.TOKENSECRETKEY;
    const { email, password } = req.body;

    // Check if the user exists
    const userQuery =
      "SELECT * FROM users WHERE email = $1 and is_verified= true and status='active'";
    client = await connect();
    const userResult = await client.query(userQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("invalid Password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const refresh_token = jwt.sign(
      { email: user.email, id: user?.id, role: user?.role },
      secretKey,
      {
        expiresIn: "7d",
      }
    );

    const updateQuery = "UPDATE users SET refresh_token = $1 WHERE id = $2";
    await client.query(updateQuery, [refresh_token, user?.id]);

    const accessToken = jwt.sign(
      { email: user.email, id: user?.id, role: user?.role },
      secretKey,
      {
        expiresIn: "3s",
      }
    );

    res.cookie("refreshToken", refresh_token, {
      secure: true,
      sameSite: "strict", // Ensures cookie is only sent over

      httpOnly: true,
      // Protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration time
    });
    // res.cookie("user", {
    //   message: "successfully Login",
    //   email: user?.email,
    //   id: user?.id,
    //   role: user?.role,
    // });
    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      // Ensures cookie is only sent over HTTPS
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: 60 * 60 * 1000, //  1 hour expiration time
    });

    return res.status(200).json({
      message: "successfully Login",
      email: user?.email,
      id: user?.id,
      role: user?.role,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released");
    }
  }
};

module.exports = { loginHandler };
