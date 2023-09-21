const mercadopago = require("mercadopago");
require("dotenv").config();

class Mercadopago {
  constructor() {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
  }
  Mensual = {
    items: [
      {
        title: "Mensualidad",
        quantity: 1,
        description: "Anual description",
        currency_id: "ARS",
        unit_price: 1000,
      },
    ],
    back_urls: {
      success: "https://spoot-front.vercel.app//premium-success",
      failure: "https://spoot-front.vercel.app/premium-fail",
    },
    notification_url:
      "https://backend-pf-production-ba15.up.railway.app/premium/webhook",
  };

  Anual = {
    items: [
      {
        title: "Anualidad",
        quantity: 12,
        description: "Anual description",
        currency_id: "ARS",
        unit_price: 800,
      },
    ],
    back_urls: {
      success: "https://spoot-front.vercel.app/premium-success",
      failure: "https://spoot-front.vercel.app/premium-fail",
    },
    notification_url:
      "https://backend-pf-production-ba15.up.railway.app/premium/webhook",
  };

  async paymentMensual(id) {
    try {
      const prefe = { ...this.Mensual, metadata: { transactionId: id } };
      const cobro = await mercadopago.preferences.create(prefe);

      return cobro;
    } catch (error) {
      return error
    }
  }

  async paymentAnual(id) {
    try {
      const prefe = { ...this.Anual, metadata: { transactionId: id } };
      const cobro = mercadopago.preferences.create(prefe);

      return cobro;
    } catch (error) {
      return error
    }
  }

  async searchId(id) {
    try {
      const cobro = await mercadopago.payment.findById(id);

      return cobro;
    } catch (error) {
      return error
    }
  }
}

module.exports = Mercadopago;
