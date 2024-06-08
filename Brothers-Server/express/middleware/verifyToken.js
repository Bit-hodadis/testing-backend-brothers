const jwt = require("jsonwebtoken");
const { connect } = require("../db/connect/postgresql");

const selectUsers = `select status from users where id= $1`;

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken)
    return res.status(403).json({ logout: "Token is required" });

  const secretKey = process.env.TOKENSECRETKEY;

  jwt.verify(accessToken, secretKey, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          console.log("is Invalide One");
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");

          return res.status(403).json({ logout: "invalide Token" });
        }

        jwt.verify(refreshToken, secretKey, async (error, deco) => {
          if (error) {
            if (error.name === "TokenExpiredError") {
              console.log("refresh Token");
              res.clearCookie("accessToken");
              res.clearCookie("refreshToken");
              return res.status(401).json({ logout: "Session Expired" });
            }
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({ logout: "Invalide Token" });
          }
          let client;
          try {
            client = await connect();
            const result = await client.query(selectUsers, [deco.id]);

            if (result?.rows[0]?.status === "active") {
              const newAccessToken = jwt.sign(
                { email: deco.email, id: deco.id, role: deco.role },
                secretKey,
                {
                  expiresIn: "1s",
                }
              );
              res.cookie("accessToken", newAccessToken, {
                secure: true,
                httpOnly: true,
                // Ensures cookie is only sent over HTTPS
                sameSite: "strict", // Protects against CSRF attacks
                maxAge: 60 * 60 * 1000, //  20 minute  expiration time
              });
              req.user = deco;

              next();
            } else {
              res.clearCookie("accessToken");
              res.clearCookie("refreshToken");
              return res.status(401).json({
                error: "your Acount is In Active Please contact the admin",
                logout: "logout",
              });
            }
          } catch (error) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({
              error: "your Acount is In Active Please contact the admin",
              logout: "logout",
            });
          } finally {
            if (client) {
              client.release();
              console.log("Database connection released");
            }
          }
        });
      } else {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).json({ logout: "Invalid  token" });
      }
    } else {
      let client;
      try {
        client = await connect();
        const result = await client.query(selectUsers, [decoded.id]);

        if (result?.rows[0]?.status === "active") {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            error: "your Acount is In Active Please contact the admin",
            logout: "logout",
          });
        }
      } catch (error) {
        return res.status(401).json({
          error: "your Acount is In Active Please contact the admin",
          logout: "logout",
        });
      } finally {
        if (client) {
          client.release();
          console.log("Database connection released");
        }
      }
    }
  });
};

module.exports = { verifyToken };
