const { User } = require("../db");

class LoginController {
  constructor() {}

  loginPost = async (email, password, thirdPartyLogin) => {
    try {
      if (thirdPartyLogin) {
        const searchThirdPartyUser = await User.findOne({
          where: {
            email: thirdPartyLogin.email,
          },
        });
        if (!searchThirdPartyUser) throw new Error("Usuario no encontrado");
        return searchThirdPartyUser;
      } else {
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

        if (user.password !== password) {
          return {
            error: "Contraseña incorrecta",
          };
        }

        return user;
      }
    } catch (err) {
      return {
        error: "Error interno del servidor",
      };
    }
  };
}

module.exports = LoginController;
