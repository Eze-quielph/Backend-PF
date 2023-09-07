const { DataTypes, Model } = require("sequelize");
const sequelize = require('../../index');

class OTP extends Model {}

OTP.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "OTP",
  }
);

module.exports = OTP;
