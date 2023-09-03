const jwt = require("jsonwebtoken");
const { LoginControllers } = require("../Controllers/index.controllers");

const loginControllers = new LoginControllers();

class LoginHandler {
  constructor() {}

  postLogin = async (req, res) => {
    const { email, password } = req.query;

    try {
      const result = await loginControllers.loginPos(email, password);
 
      if (result.error) {
        return res.status(401).json({ message: result.error });
      }

      const token = jwt.sign({ user: result }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}
module.exports = LoginHandler;
