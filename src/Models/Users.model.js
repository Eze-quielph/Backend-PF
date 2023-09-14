const { DataTypes, Model } = require("sequelize");
const sequelize = require('../sequelize');

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        premium: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        image: {
          type: DataTypes.TEXT,
        },
        otpSecret: {
          type: DataTypes.STRING,
        },
        otpCounter: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Users",
        freezeTableName: true,
        paranoid: true,
        indexes: [
          {
            unique: true,
            fields: ["id"],
          },
          {
            unique: true,
            fields: ["email"],
          },
          {
            fields: ["username"],
          },
        ],
      }
    );
  }
}

User.initModel(sequelize);

module.exports = User;
