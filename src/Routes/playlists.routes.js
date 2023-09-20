const playlistsRouter = require("express").Router();

//Middleware
const validateIdMiddleware = require('../Middleware/playlist.middleware/byId.middleware')
const validateNameMiddleware = require('../Middleware/playlist.middleware/ByName.middleware')
const validateItems = require('../Middleware/playlist.middleware/validateItems.middleware')

//Handler
const { PlaylistsHandler } = require("../Handlers/index.handlers");
const playlistsHandler = new PlaylistsHandler();

//Routes
playlistsRouter.get("/", playlistsHandler.getPlaylists);
playlistsRouter.get("/:id", validateIdMiddleware, playlistsHandler.getPlaylistById);
playlistsRouter.get("/name", validateNameMiddleware, playlistsHandler.getPlaylistByName);
playlistsRouter.post("/", validateItems, playlistsHandler.postPlaylist);
playlistsRouter.put("/:id", validateIdMiddleware, validateItems,  playlistsHandler.putPlaylist);
playlistsRouter.delete("/:id", validateIdMiddleware, playlistsHandler.deletePlaylist);

module.exports = playlistsRouter;