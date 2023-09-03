const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  const tokenBearer = token.split(" ")[1];
  req.token = tokenBearer;

  jwt.verify(tokenBearer, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    } else {
      next();
    }
  });

  //const beareHader = req.headers["authorization"];
  // if (typeof beareHader !== "undefined") {
  //   const bearerToken = beareHader.split(" ")[1];
  //   req.token = bearerToken;
  //   next();
  // } else {
  //   res.sendStatus(403);
  // }
};

module.exports = verifyToken;
