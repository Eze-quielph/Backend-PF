const { sequelize } = require('../../index')
const {DataTypes, Model} = require("sequelize")

class Payment extends Model {
    static initModel(sequelize){
        Payment.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId:{
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentId:{
                type: DataTypes.STRING,
                allowNull: false
            },
            estado:{
                type: DataTypes.STRING,
                defaultValue:"en proceso"
            },
            resultado:{
                type: DataTypes.BOOLEAN,
                defaultValue:false
            }
        }, {
            sequelize,
            modelName: "Payment",
            freezeTableName: true,
          })
    }
}

Payment.initModel(sequelize)

module.exports = Payment