const jwt = require("jsonwebtoken");

const verifyEmailToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Error" });

  const secretKey = process.env.TOKENSECRETKEY;

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "error" });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = { verifyEmailToken };
