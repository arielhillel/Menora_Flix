const jwt = require("jsonwebtoken");
const config = require("config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.get("env.ACCESS_TOKEN_SECRET"), (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.UserInfo.email;
    next();
  });
};

module.exports = verifyJWT;
