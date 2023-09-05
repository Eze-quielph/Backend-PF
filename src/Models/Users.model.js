const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
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
    },
    { freezeTableName: true,
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
      ], }
  );
};