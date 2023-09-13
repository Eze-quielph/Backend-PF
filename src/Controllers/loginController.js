const Users = require("../Models/Users.model");
const bcrypt = require("bcrypt");

class LoginController {
  constructor() {}

  loginPost = async (email, password) => {
    try {
      console.log(email, password);
      const user = await Users.findOne({
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
    
      const match = await bcrypt.compare(password, userPassword);

      if (match) {
        return user;
      } else {
        return {
          error: "Parámetros no coinciden ",
        };
      }
    } catch (err) {
      return {
        error: "Error interno del servidor",
      };
    }
  };
}

module.exports = LoginController;
