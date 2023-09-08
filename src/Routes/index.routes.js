const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const songRouter = require("./Song.routes");
const playlistsRouter = require("./playlists.routes");
const pmRoutes = require("./Premium.routes");

require("dotenv").config();
const {
  FIRE_AUTH_DOMAIN,
  FIRE_API_KEY,
  FIRE_PROJECT_ID,
  FIRE_STORAGE_BUCKET,
  FIRE_MESSAGING_SENDER_ID,
  FIRE_APP_ID,
  FIRE_MEASUREMENT_ID,
} = process.env;

mainRouter.use("/users", usersRouter);
mainRouter.use("/song", songRouter);
mainRouter.use("/playlists", playlistsRouter);
mainRouter.use("/premium", pmRoutes);
mainRouter.get("/env", (req, res) =>
  res.status(200).json({
    FIRE_AUTH_DOMAIN,
    FIRE_API_KEY,
    FIRE_PROJECT_ID,
    FIRE_STORAGE_BUCKET,
    FIRE_MESSAGING_SENDER_ID,
    FIRE_APP_ID,
    FIRE_MEASUREMENT_ID,
  })
);

module.exports = mainRouter;
