const { User } = require("../Models/Models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const mailer = require("../Services/nodemailer/Mailer");

class UserController {
  constructor() {}

  async getUsers(page, perPage) {
    const offset = (page - 1) * perPage;
    return User.findAll({ offset, limit: perPage });
  }

  getUserByName = async (username, page, perPage) => {
    try {
      console.log("Username Controller: ",username)
      const databaseUser = await User.findAll({
        where: {
          username: { [Op.iLike]: `%${username}%` },
        },
        offset: (page - 1) * perPage,
        limit: perPage,
      });

      console.info("Database user: ",databaseUser)
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

  async postUser(username, email, password, image, otpSecret) {
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
      otpSecret: otpSecret,
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

  async userPremiun(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      return { message: "no existe un usuario con ese ID" };
    }
    const premium = await user.update({ premium: true });
    console.log(premium);

    await mailer.sendPremiumUser(user.dataValues.email);
    console.log(premium);
  }

  async returnPassword(email, password) {
    try {
      const user = await User.findOne({ where: {
        email:email
      }});
      if (!user) {
        return { message: "no existe un usuario con ese ID" };
      }

      const hashPassword = await bcrypt.hash(password, 8);

      await user.update({ password: hashPassword });
      console.info(user);
      return {
        result: true,
        message: "Password actualizada correctamente",
        email: user.dataValues.email,
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
