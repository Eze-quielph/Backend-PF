const UserController = require("../Controllers/usersControllers");
const userController = new UserController();
const { User } = require("../db");

const UploadFile = require("../Services/Upload");
const uploadFIle = new UploadFile();

class UserHandler {
  constructor() {}
  getUsers = async (req, res) => {
    const { username } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;

    try {
      const data = username
        ? await userController.getUserByName(username, page, perPage)
        : await userController.getUsers(page, perPage);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;

    try {
      const data = await userController.getUserById(id);
      if (!data) throw new Error("no existe user con id");
      res.status(200).json({ result: data });
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
}

module.exports = UserHandler;
