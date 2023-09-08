const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const songRouter = require("./Song.routes");
const playlistsRouter = require("./playlists.routes");
const favoriteSongRoutes = require("./favoriteSong.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/song", songRouter);
mainRouter.use("/playlists", playlistsRouter);
mainRouter.use("/favorites", favoriteSongRoutes);

module.exports = mainRouter;
