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

  getByName = async (name) => {
    try {
      const data = await Song.findAll({ where: { name } });
      if (!data) throw new Error("No existe cancion con ese nombre");
      return data;
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

  updateSong = async(id, name, description, artist, genre, newImage)=>{
    try {
        const existingSong = await Song.findByPk(id);
        console.log(name, description, artist, genre, newImage);
        if (name) existingSong.name = name;
        if (description) existingSong.description = description;
        if (artist) existingSong.artist = artist;
        if (genre) existingSong.genre = genre;
        if (newImage) existingSong.image = newImage;

        const data = await existingSong.save();
        return data;
    } catch (error) {
        return error
    }
  }
}

module.exports = SongsControllers;
