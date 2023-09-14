const {Payment} = require('../Models/Models')

class PaymentController {
    constructor(){}

    async createPayment(userId, paymentId){
        try {
            const data = await Payment.create({
                userId,
                paymentId
            })
            return data
        } catch (error) {
            return error
        }
    }

    async updatePayment(id){
        try {
            const existingPayment = await Payment.findOne({
                where:{paymentId: id}
            })
            if(!existingPayment) return{
                message: 'Payment ID not found'
            }
            const updatedPayment = await existingPayment.update({
                estado:"pagado",
                resultado: true
            })
            return updatedPayment
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PaymentController