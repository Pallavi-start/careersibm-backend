const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};