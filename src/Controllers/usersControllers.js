const { sequelize } = require("../db");
const { User } = sequelize.models;
const { Op } = require("sequelize");

class UserController {
  constructor() {}
  getUsers = async () => {
    try {
      const data = await User.findAll();
      return data;
    } catch (error) {
      return error;
    }
  };
  getUserByName = async (username) => {
    try {
      const databaseUser = await User.findAll({
        where: { username: { [Op.iLike]: `%${username}%` } },
      });
      if (!databaseUser) throw new Error("No existe cancion con ese nombre");
      return databaseUser;
    } catch (error) {
      console.log(error);
    }
  };

  getUserById = async (id) => {
    try {
      const userId = await User.findByPk(id);
      if (!userId) throw new Error("No existe user con ese id");
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  putUser = async (id, username, email, password, image) => {
    try {
      let userId = await User.findByPk(id);
      if (!userId) {
        res.status(400).json({ message: `No existe user con ese id` });
      }

      const data = await userId.update({
        ...userId,
        username,
        email,
        password,
        image,
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  postUser = async (username, email, password, image) => {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          existing: true,
          message: "Ya existe un user con ese email",
        };
      }

      const data = await User.create({
        username: username,
        email: email,
        password: password,
        image: image,
      });

      return data;
    } catch (error) {
      return error;
    }
  };
  deleteUser = async (id) => {
    try {
      const deleteUser = await User.findByPk(id);
      const respuesDelete = await deleteUser.destroy();
      return respuesDelete;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
