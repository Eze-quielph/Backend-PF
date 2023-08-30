const mainRouter = require("express").Router();

// Importo todas las rutas
const usersRouter = require("./users.routes");

mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
