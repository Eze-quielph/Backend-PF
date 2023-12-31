const UserController = require("../Controllers/usersControllers");
const userController = new UserController();

const UploadFile = require("../Services/Upload");
const uploadFIle = new UploadFile();

const mailer = require("../Services/nodemailer/Mailer");

const { client } = require("../Services/Redis/redis.config");

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  /* HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED, */
} = require("../Utils/statusCode");

const speakeasy = require("speakeasy");

class UserHandler {
  constructor() {}

  async getUsers(req, res) {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    let result;
    try {
      await client.get("users", (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(HTTP_STATUS_OK).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUsers(page, perPage);
      if (!result) throw new Error("No se encontro los datos");

      await client.setEx("users", 15000, JSON.stringify(result));
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  }

  async getUsersName(req, res) {
    const { username } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    let result;
    try {
      console.info("username handler: ", username)
      await client.get(`${username}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(HTTP_STATUS_OK).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUserByName(username, page, perPage);
      console.info("result final handler: ", result)
      if (!result) throw new Error("No se encontro los datos");
      await client.setEx(`${username}`, 15000, JSON.stringify(result));
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  }

  getUserById = async (req, res) => {
    const { id } = req.params;
    let result;
    try {
      await client.get(`${id}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(HTTP_STATUS_OK).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUserById(id);
      if (!result) throw new Error("no existe user con id");
      await client.setEx(`${id}`, 15000, JSON.stringify(result));
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  registertUser = async (req, res) => {
    const { username, email, password } = req.body;

    const file = req.file;
    let newImage;

    try {
      if (file) {
        const imagePath = file.path;
        const data = await uploadFIle.uploadImage(imagePath);

        if (data.length < 15) {
          newImage = imagePath;
        } else {
          newImage = data;
        }
      }

      const secret = speakeasy.generateSecret({ length: 20 });
      const otpUri = speakeasy.otpauthURL({
        secret: secret.ascii,
        label: "backend-pf",
        issuer: "backend-pf",
      })

      const newUser = await userController.postUser(
        username,
        email,
        password,
        newImage,
        secret.ascii
      );

      if (newUser.existing == true)
        res
          .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .json({ error: newUser.message });
      else {
        await mailer.sendNewUser(email, otpUri);
        res.status(HTTP_STATUS_OK).json({ data: newUser });
      }
    } catch (error) {
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  putUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const file = req.file;
    let newImage;
    try {
      if (file) {
        const imagePath = file.path;
        const data = await uploadFIle.uploadImage(imagePath);
        if (data.length < 15) {
          newImage = imagePath;
        } else {
          newImage = data;
        }
      }
      const result = await userController.putUser(
        id,
        username,
        email,
        password,
        newImage
      );
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ error: "No se recibieron parametros necesarios" });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const deteData = await userController.deleteUser(id);
      res.status(HTTP_STATUS_OK).json({ deteData: deteData });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  async restoreUserById(req, res) {
    const { id } = req.params;
    try {
      const result = await userController.restoreUsers(id);
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  }
  async returnPassword(req, res) {
    const { email, password } = req.query;
  
    try {
      if (!password) {
        return res
          .status(HTTP_STATUS_BAD_REQUEST)
          .json({ status: "false", message: "No enviaste el password" });
      }
  
      const result = await userController.returnPassword(email, password);
  
      if (result.result == false || result.error) {
        res.status(HTTP_STATUS_BAD_REQUEST).json({ result: result });
      } else {
        console.info(result);
        await mailer.updatePassword(result.email);
        res.status(HTTP_STATUS_OK).json({ result: result });
      }
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  }
  
  
}

module.exports = UserHandler;
