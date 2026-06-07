// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {

//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({
//       msg: "No token",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.admin = decoded;

//     next();

//   } catch (err) {

//     res.status(401).json({
//       msg: "Invalid token",
//     });

//   }
// };
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("AUTH HEADER:", req.header("Authorization"));
    // 👇 IMPORTANT: USER identity
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};