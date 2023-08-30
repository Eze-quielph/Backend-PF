const { User } = require("../db");
const { Op } = require("sequelize");

class UserController {
  constructor() {}
  //cambios
  getUsers = async () => {
    // console.log("estas en el controller de users");
    return await User.findAll();
  };
  getUserByName = async (username) => {
    // console.log("estas en el controller de users");
    const databaseUser = await User.findAll({
      where: { username: { [Op.iLike]: `%${username}%` } },
    });
    return databaseUser;
  };

  getUserById = async (id) => {
    const userId = await User.findByPk(id);
    return userId;
  };

  postUser = async (username, email, password) => {
    return await User.create({ username, email, password });
  };
  deleteUser = async (id) => {
    const deleteUser = await User.findByPk(id);

    const respuesDelete = await deleteUser.destroy();

    return respuesDelete;
  };
}

module.exports = UserController;
