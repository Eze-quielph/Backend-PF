const LoginControllers = require("../Controllers/login.controllers");

const loginControllers = new LoginControllers();
const { User } = require("../db");

const jwt = require("jsonwebtoken");

class LoginHandler {
  constructor() {}
  postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username: username,
          password: password,
        },
      });
      if (user) {
        jwt.sign({ user }, "secretKey", { expiresIn: "600s" }, (err, token) => {
          res.json(token);
        });
      } else {
        res.status(401).json({ message: "Usuario no válido" });
      }
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  };
}

// class LoginHandler {
//   constructor() {}
//   postLogin = async (req, res) => {
//     //res.send("estas en el handler");
//     const { username, password } = req.body;
//     try {
//       const user = await loginControllers.loginPos(username, password);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
// }

module.exports = LoginHandler;
