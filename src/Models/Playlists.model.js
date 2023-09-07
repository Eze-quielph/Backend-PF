const { DataTypes, Model } = require("sequelize");
const {sequelize} = require('../../index'); // Asegúrate de que la ruta sea correcta

class Playlist extends Model {
  static initModel(sequelize) {
    Playlist.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        sequelize,
        modelName: "Playlist",
        timestamps: false,
        freezeTableName: true,
      }
    );
  }
}

Playlist.initModel(sequelize);

module.exports = Playlist;
