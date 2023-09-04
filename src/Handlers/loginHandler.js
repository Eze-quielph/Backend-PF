const jwt = require("jsonwebtoken");
const { LoginController } = require("../Controllers/index.controllers");

const loginController = new LoginController();

class LoginHandler {
  constructor() {}

  postLogin = async (req, res) => {
    const { email, password, thirdPartyLogin } = req.body;

    try {
      const result = await loginController.loginPost(
        email,
        password,
        thirdPartyLogin
      );

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