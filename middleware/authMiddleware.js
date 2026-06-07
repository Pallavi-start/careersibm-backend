const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // safer parsing
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};