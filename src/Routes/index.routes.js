const mainRouter = require("express").Router();

// Importo todas las rutas
const usersRouter = require("./users.routes");
const songRouter = require('./Song.routes')

mainRouter.use("/users", usersRouter);
mainRouter.use('/song', songRouter)

module.exports = mainRouter