const favoriteSongRoutes = require("express").Router();

const { FavoriteSongHandler } = require("../Handlers/index.handlers");
const favoriteSongHandler = new FavoriteSongHandler();

favoriteSongRoutes.post("/:id", favoriteSongHandler.postFavorite);

// favoriteSongRoutes.post("/", (req, res) => {
//   res.send("estas en el post router");
// });

module.exports = favoriteSongRoutes;
