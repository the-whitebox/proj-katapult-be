const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Please provide token.",
    });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: err,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
