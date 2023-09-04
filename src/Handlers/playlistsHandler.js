const PlaylistsController = require("../Controllers/playlistsController");

const playlistsController = new PlaylistsController();

const { client } = require("../Services/Redis/redis.config");

class PlaylistsHandler {
  constructor() {}

  getPlaylists = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    try {
      let result;
      await client.get("playlists", (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });

      result = await playlistsController.getPlaylists(page, perPage);
      await client.setEx("playlists", 15000, JSON.stringify(result));
      res.status(200).json(allPlaylists);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getPlaylistById = async (req, res) => {
    const { id } = req.params;
    try {
      let result;
      await client.get(`${id}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });
      result = await playlistsController.getPlaylistById(id);
      if (!result) throw new Error("Playlist unavailable");
      await client.setEx(`${id}`, 15000, JSON.stringify(result));
      res.status(200).json(playlist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getPlaylistByName = async (req, res) => {
    const { name } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    try {
      let result;
      await client.get(`${name}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });
      if (!name) throw new Error("Name not entered");
      result = await playlistsController.getPlaylistByName(name, page, perPage);
      if (!searchByName.length) throw new Error("Playlist not found");
      await client.setEx(`${name}`, 15000, JSON.stringify(result));
      res.status(200).json(searchByName);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  postPlaylist = async (req, res) => {
    const { name, description } = req.body;
    try {
      const newPlaylist = await playlistsController.postPlaylist(
        name,
        description
      );
      if (!newPlaylist) throw new Error("Playlist couldn't be created");
      res.status(201).json(newPlaylist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  putPlaylist = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const editedPlaylist = await playlistsController.putPlaylist(
        name,
        description,
        id
      );
      if (!editedPlaylist) throw new Error("Playlist couldn't be modified");
      res.status(200).json(editedPlaylist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deletePlaylist = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPlaylist = await playlistsController.deletePlaylist(id);
      if (!deletedPlaylist) throw new Error("Playlist couldn't be deleted");
      res.status(201).json(deletedPlaylist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = PlaylistsHandler;
