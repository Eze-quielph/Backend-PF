const UserController = require("../Controllers/usersControllers");
const userController = new UserController();
const { User } = require("../db");

const UploadFile = require("../Services/Upload");
const uploadFIle = new UploadFile();

class UserHandler {
  constructor() {}
  getUsers = async (req, res) => {
    const { username } = req.query;

    try {
      const data = username
        ? await userController.getUserByName(username)
        : await userController.getUsers();

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;

    try {
      const data = await userController.getUserById(id);
      res.status(200).json({ result: data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  postUser = async (req, res) => {
    const { username, email, password } = req.body;
    const files = req.file;
    //console.log(files);
    //console.log(username, email, password);
    try {
      const imagePatch = files.path;
      //console.log(imagePatch);
      const uploadedImage = await uploadFIle.uploadImage(imagePatch);
      console.log(uploadedImage);
      const image = uploadedImage;
      const newUser = await userController.postUser(
        username,
        email,
        password,
        image
      );
      console.log(newUser);
      res.status(200).json({ data: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  putUser = async (req, res) => {
    //res.send("estas en actualziar del handler");
    const { id } = req.params;
    const { username, email, password } = req.body;
    const file = req.file;
    let newImage;
    try {
      if (file) {
        const imagePath = file.path;
        const data = await uploadFIle.uploadImage(imagePath);
        if (data.error) {
          newImage = imagePath;
        } else {
          newImage = data;
        }
      }
      //const updateuser = await updateuser(id, name, email, password);
      let userId = await User.findByPk(id);
      if (!userId) {
        res.status(400).json({ message: `Id incorrecto` });
      }
      await userId.update({ ...userId, username, email, password, newImage });
      res.status(200).json(userId);
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
