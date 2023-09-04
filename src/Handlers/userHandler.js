const UserController = require("../Controllers/usersControllers");
const userController = new UserController();

const UploadFile = require("../Services/Upload");
const uploadFIle = new UploadFile();

const { client } = require("../Services/Redis/redis.config");

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
} = require("../Utils/statusCode");

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
          res.status(200).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUsers(page, perPage);
      if (!result) throw new Error("No se encontro los datos");

      await client.setEx("users", 15000, JSON.stringify(result));
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsersName(req, res) {
    const { username } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    let result;
    try {
      await client.get(`${username}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(200).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUserByName(username, page, perPage);
      if (!result) throw new Error("No se encontro los datos");
      await client.setEx(`${username}`, 15000, JSON.stringify(result));
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  getUserById = async (req, res) => {
    const { id } = req.params;
    let result;
    try {
      await client.get(`${id}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(200).json({ result: result });
        }
        console.log(err);
      });
      result = await userController.getUserById(id);
      if (!result) throw new Error("no existe user con id");
      await client.setEx(`${id}`, 15000, JSON.stringify(result));
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  postUser = async (req, res) => {
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
      const newUser = await userController.postUser(
        username,
        email,
        password,
        newImage
      );

      if (newUser.existing == true)
        res.status(500).json({ error: newUser.message });
      else res.status(200).json({ data: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(200).json({ result: result });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "No se recibieron parametros necesarios" });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const deteData = await userController.deleteUser(id);
      res.status(200).json({ deteData: deteData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  async restoreUserById(req, res) {
    const { id } = req.params;
    try {
      const result = await userController.restoreUsers(id);
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserHandler;
