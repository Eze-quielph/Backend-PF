const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const songRouter = require("./Song.routes");
const playlistsRouter = require("./playlists.routes");
const pmRoutes = require("./Premium.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/song", songRouter);
mainRouter.use("/playlists", playlistsRouter);
mainRouter.use("/premium", pmRoutes);


module.exports = mainRouter;
