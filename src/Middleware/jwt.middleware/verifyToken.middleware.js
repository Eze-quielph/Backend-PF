const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  const tokenBearer = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenBearer, process.env.JWT_SECRET);
    // Agregar la información del usuario decodificada al objeto de solicitud
    req.user = decoded;
    //console.log(req.user);
    // Continuar con la ejecución normal
    next();
  } catch (error) {
    // Manejar el error de manera adecuada y detener la ejecución
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = verifyToken;
