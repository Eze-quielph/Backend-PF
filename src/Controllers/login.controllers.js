const { User } = require("../db");

class LoginControllers {
  constructor() {}

  loginPos = async (username, password) => {
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (user) {
      jwt.sign({ user }, "secretKey", { expiresIn: "15s" }, (err, token) => {
        res.json(token);
      });
    } else {
      // El usuario no existe en la base de datos
      res.status(401).json({ message: "Usuario no válido" });
    }
    return user;
  };
}

module.exports = LoginControllers;
