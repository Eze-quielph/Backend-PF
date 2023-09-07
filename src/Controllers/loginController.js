const  User  = require("../Models/Users.model");
const bcrypt = require("bcrypt");

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
        const userPassword = user.password;

        // if (user.password !== password) {
        //   return {
        //     error: "Contraseña incorrecta",
        //   };
        // }

        await bcrypt.compare(userPassword, password).then((result) => {
          if (result) {
            return user;
          } else {
            return {
              error: "Parámetros no coinciden ",
            };
          }
        });
      }
    } catch (err) {
      return {
        error: "Error interno del servidor",
      };
    }
  };
}

module.exports = LoginController;
