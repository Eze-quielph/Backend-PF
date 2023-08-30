const playlistsRouter = require("express").Router();
const { PlaylistsHandler } = require("../Handlers/index.handlers");

const playlistsHandler = new PlaylistsHandler();

playlistsRouter.get("/", playlistsHandler.getPlaylists);
playlistsRouter.get("/:id", playlistsHandler.getPlaylistById);
playlistsRouter.get("/name", playlistsHandler.getPlaylistByName);
playlistsRouter.post("/", playlistsHandler.postPlaylist);
playlistsRouter.put("/:id", playlistsHandler.putPlaylist);
playlistsRouter.delete("/:id", playlistsHandler.deletePlaylist);

module.exports = playlistsRouter;