const { DataTypes, Model } = require("sequelize");
const sequelize = require('../sequelize'); 

class Song extends Model {
  static initModel(sequelize) {
    Song.init(
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
        Points: {
          type: DataTypes.INTEGER,
          DefaultValue: 0,
        }
      },
      {
        sequelize,
        modelName: "Song",
        freezeTableName: true,
        paranoid: true,
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
  }
}

Song.initModel(sequelize);

module.exports = Song;
