const pmRoutes = require('express').Router()

const PremiunHandler = require('../Handlers/premiunHandlers')
const premiunHandler = new PremiunHandler()

pmRoutes.post('/mensual', premiunHandler.getMensual)
pmRoutes.get('/success', (req, res) => res.send("Hola pago"))
pmRoutes.get('/failed', (req, res) => res.send("Pago fallido"))
pmRoutes.get('/anual', premiunHandler.getAnual)
pmRoutes.post('/webhook', premiunHandler.webHook)

module.exports = pmRoutes