const Mercadopago = require("../Services/mercadopago/Mercadopago");
const mercadopago = new Mercadopago();

const generarIdUnico = require("../Helpers/generateId");

const UserController = require("../Controllers/usersControllers");
const usersController = new UserController();

const PaymentController = require("../Controllers/paymentController");
const paymentController = new PaymentController();

class PremiunHandler {
  constructor() {}

  async getMensual(req, res) {
    const { userId } = req.query;
    try {
      const idUnico = generarIdUnico();
      const preference = await mercadopago.paymentMensual(idUnico);
      await paymentController.createPayment(userId, idUnico);

      res.redirect(preference.body.init_point);
    } catch (error) {
      console.error("Error al generar la preferencia de pago mensual:", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  }

  async getAnual(req, res) {
    const { userId } = req.query;
    try {
      const idUnico = generarIdUnico()
      const preference = await mercadopago.paymentAnual(idUnico);
      await paymentController.createPayment(userId, idUnico);

      res.redirect(preference.body.init_point);
    } catch (error) {
      console.error("Error al generar la preferencia de pago anual:", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  }
  async webHook(req, res) {
    const payment = req.body;
    if (payment.type == "payment") {
      const transactionId = payment.data.id;
      const data = await mercadopago.searchId(transactionId);
      const id = data.body.metadata.transaction_id;
      const result = await paymentController.updatePayment(id);
      const userId = result.dataValues.userId

      await usersController.userPremiun(userId, )	
      res.status(204);
    }
    res.status(200);
  }
}

module.exports = PremiunHandler;
