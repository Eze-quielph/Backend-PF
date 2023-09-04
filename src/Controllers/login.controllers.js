const { User } = require("../db");

class LoginControllers {
  constructor() {}

  loginPos = async (email, password) => {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return {
          error: "Usuario no encontrado",
        };
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada
      if (user.password !== password) {
        return {
          error: "Contraseña incorrecta",
        };
      }

      return user;
    } catch (err) {
      return {
        error: "Error interno del servidor",
      };
    }
  };

}

module.exports = LoginControllers;
