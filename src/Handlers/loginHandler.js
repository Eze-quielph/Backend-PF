const jwt = require("jsonwebtoken");
const { LoginController } = require("../Controllers/index.controllers");

const loginController = new LoginController();
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require("../Utils/statusCode");

const speakeasy = require("speakeasy");

class LoginHandler {
  constructor() {}

  postLogin = async (req, res) => {
    const { email, password, otp } = req.body;

    try {
      const result = await loginController.loginPost(email, password);

      if (!result) {
        return res
          .status(HTTP_STATUS_BAD_REQUEST)
          .json({ message: "result no existe" });
      }

      speakeasy.totp.verify({
        secret: result.otpSecret,
        encoding: "ascii",
        token: otp,
        window: 1,
      });

      result.otpCounter += 1;
      await result.save();

      const token = jwt.sign({ user: result }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.status(HTTP_STATUS_OK).json({
        message: "Usuario autenticado exitosamente.",
        token,
        user: result,
      });
    } catch (error) {
      console.log(error);
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: "Error interno del servidor" });
    }
  };
}

module.exports = LoginHandler;
