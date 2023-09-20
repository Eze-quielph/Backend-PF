const  {Playlist}  = require("../Models/Models");
const { Op } = require("sequelize");

class PlaylistsController {
  constructor() {}

  getPlaylists = async (page, perPage) => {
    const playlists = await Playlist.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
    });
    return playlists;
  };

  getPlaylistById = async (id) => {
    const playlistById = await Playlist.findByPk(id);
    return playlistById;
  };

  getPlaylistByName = async (name, page, perPage) => {
    const playlistByName = await Playlist.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      offset: (page - 1) * perPage,
      limit: perPage,
    });
    return playlistByName;
  };

  postPlaylist = async (name, description) => {
    return await Playlist.create({ name, description });
  };

  putPlaylist = async (name, description, id) => {
    const playlist = await Playlist.findByPk(id);

    Playlist.update({
      name: name,
      description: description,
    });

    return playlist;
  };

  deletePlaylist = async (id) => {
    const playlistToDelete = await Playlist.findByPk(id);
    await playlistToDelete.destroy();
    return {
      message: "Playlist successfully deleted",
    };
  };
}

module.exports = PlaylistsController;
