const  {Playlist, Song}  = require("../Models/Models");
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
    const playlistById = await Playlist.findByPk(id, {
      include: {
        model: Song,
        through: { attributes: [] },
      },
    });
    return playlistById;
  };

  getPlaylistByName = async (name, page, perPage) => {
    const playlistByName = await Playlist.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      offset: (page - 1) * perPage,
      limit: perPage,
    }, {
      include: {
        model: Song,
        through: { attributes: [] },
      },
    });
    return playlistByName;
  };

  postPlaylist = async (name, description) => {
    const find = await Playlist.findAll({
      where: { name: { [Op.iLike]: name } }});
    if (!find.length) {
      const createdPlaylist = await Playlist.create({ name, description });
      return createdPlaylist;
    }
  };

  postSongToPlaylist = async (songId, playlistId) => {
    const song = await Song.findByPk(songId);
    const playlist = await Playlist.findByPk(playlistId);
    await playlist.addSong(song);
    return playlist;
  };

  putPlaylist = async (name, description, id) => {
    const playlist = await Playlist.findByPk(id);

    Playlist.update({
      name: name,
      description: description,
    });

    return playlist;
  };

  putSongFromPlaylist = async (songId, playlistId) => {
    const song = await Song.findByPk(songId);
    const playlist = await Playlist.findByPk(playlistId);
    await playlist.removeSong(song);
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
