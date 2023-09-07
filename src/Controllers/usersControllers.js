const { sequelize } = require("../db");
const { User } = sequelize.models;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

class UserController {
  constructor() {}

  async getUsers(page, perPage) {
    const offset = (page - 1) * perPage;
    return User.findAll({ offset, limit: perPage });
  }

  getUserByName = async (username, page, perPage) => {
    try {
      const databaseUser = await User.findAll({
        where: {
          username: { [Op.iLike]: `%${username}%` },
        },
        offset: (page - 1) * perPage,
        limit: perPage,
      });

      if (!databaseUser || databaseUser.length === 0) {
        throw new Error("No existe usuario con ese nombre");
      }

      return databaseUser;
    } catch (error) {
      throw error;
    }
  };

  async getUserById(id) {
    return User.findByPk(id);
  }

  async putUser(id, username, email, password, image) {
    const user = await User.findByPk(id);
    if (!user) {
      return { message: `No existe un usuario con ese ID` };
    }

    const updatedUser = await user.update({ username, email, password, image });
    return updatedUser;
  }

  async postUser(username, email, password, image) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return {
        existing: true,
        message: "Ya existe un usuario con ese email",
      };
    }

    const hashedContraseña = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedContraseña,
      image,
    });

    return newUser;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return { message: `No existe un usuario con ese ID` };
    }

    await user.destroy();
    return { message: "Usuario eliminado correctamente" };
  }

  async restoreUsers(id) {
    try {
      const user = await User.findByPk(id, { paranoid: false });
      if (!user) {
        return { message: "no existe un usuario con ese ID" };
      }
      await user.restore();
      return {
        result: true,
        message: "Usuario restaurado correctamente",
      };
    } catch (error) {
      return {
        result: false,
        error: error.message,
      };
    }
  }
}

module.exports = UserController;
