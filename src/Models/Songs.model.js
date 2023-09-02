const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "song",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      song: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
        {
          unique: true,
          fields: ["name"],
        },
        {
          fields: ["artist"],
        },
        {
          fields: ["genre"],
        },
      ],
    }
  );
};
