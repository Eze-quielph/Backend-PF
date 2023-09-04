const jwt = require("jsonwebtoken");
const { LoginController } = require("../Controllers/index.controllers");

const loginController = new LoginController();
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

class LoginHandler {
  constructor() {}

  postLogin = async (req, res) => {
    const { email, password, thirdPartyLogin } = req.query;
    console.log(req.query);
    try {
      const result = await loginController.loginPost(
        email,
        password,
        thirdPartyLogin
      );

      if (result.error) {
        return res
          .status(HTTP_STATUS_UNAUTHORIZED)
          .json({ message: result.error });
      }

      const token = jwt.sign({ user: result }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error); 
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error.message || "Error interno del servidor" });
    }
  };
}

module.exports = LoginHandler;
