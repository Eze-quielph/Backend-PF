const { sequelize } = require("../db");
const { Song } = sequelize.models;
const { Op } = require("sequelize");

class SongsControllers {
  constructor() {}

  getAll = async () => {
    try {
      
      const data = await Song.findAll();
      if (!data) throw new Error("No hay nada en la db");
      return data;
    } catch (error) {
      return error;
    }
  };
  getAllFiltered = async (genre, artist) => {
    try {
      if (genre && artist) {
        const data = await Song.findAll({
          where: { genre: { [Op.iLike]: `%${genre}%` }, artist: { [Op.iLike]: `%${artist}%` } },
        });
        return data;
      } else if (genre && !artist) {
        const data = await Song.findAll({
          where: { genre: { [Op.iLike]: `%${genre}%` } },
        });
        return data;
      } else {
        const data = await Song.findAll({
          where: { artist: { [Op.iLike]: `%${artist}%` } },
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  getByName = async (name, genre, artist) => {
    try {
      const data = await Song.findAll({
        where: { name: { [Op.iLike]: `%${name}%` },  },
      });
      if (!data) throw new Error("No existe cancion con ese nombre");
      return data;
    } catch (error) {
      return error;
    }
  };
  getByNameFiltered = async (name, genre, artist) => {
    try {
      if (genre && artist) {
        const data = await Song.findAll({
          where: { name: { [Op.iLike]: `%${name}%` }, genre: { [Op.iLike]: `%${genre}%` }, artist: { [Op.iLike]: `%${artist}%` } },
        });
        return data;
      } else if (genre && !artist) {
        const data = await Song.findAll({
          where: { name: { [Op.iLike]: `%${name}%` }, genre: { [Op.iLike]: `%${genre}%` } },
        });
        return data;
      } else {
        const data = await Song.findAll({
          where: { name: { [Op.iLike]: `%${name}%` }, artist: { [Op.iLike]: `%${artist}%` } },
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  getById = async (id) => {
    try {
      const data = await Song.findByPk(id);
      if (!data) throw new Error("No existe cancion con ese id");
      return data;
    } catch (error) {
      return error;
    }
  };

  updateSong = async (id, name, description, artist, genre, newImage) => {
    try {
      const existingSong = await Song.findByPk(id);
      if (name) existingSong.name = name;
      if (description) existingSong.description = description;
      if (artist) existingSong.artist = artist;
      if (genre) existingSong.genre = genre;
      if (newImage) existingSong.image = newImage;

      const data = await existingSong.save();
      return data;
    } catch (error) {
      return error;
    }
  };

  disableSong = async (id, value) => {
    try {
      const existingSongName = await Song.findByPk(id);
      if (!existingSongName) throw new Error("No existe cancion con ese id");

      let bool = value == true ? true : false;

      if (value) existingSongName.isActive = bool;
      const data = await existingSong.save();
      return data;
    } catch (error) {
      return error;
    }
  };

  postSong = async (name, description, artist, genre, image, song) => {
    try {
      const existingSongName = await Song.findOne({ where: { name } });
      if (existingSongName)
        throw new Error("Ya existe una canción con ese nombre");

      //console.log(image, song);
      const data = await Song.create({
        name: name,
        description: description,
        artist: artist,
        genre: genre,
        song: song,
        image: image,
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

module.exports = SongsControllers;
