const { Song } = require("../Models/Models");
const { Op } = require("sequelize");

class SongsControllers {
  constructor() {}

  getAll = async (page, perPage) => {
    try {
      const data = await Song.findAll({
        offset: (page - 1) * perPage,
        limit: perPage,
      });
      if (!data) throw new Error("No hay nada en la db");
      return data;
    } catch (error) {
      return error;
    }
  };
  getAllFiltered = async (genre, artist, page, perPage) => {
    try {
      if (genre && artist) {
        const data = await Song.findAll({
          where: {
            genre: { [Op.iLike]: `%${genre}%` },
            artist: { [Op.iLike]: `%${artist}%` },
          },
          offset: (page - 1) * perPage,
          limit: perPage,
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

  getByName = async (name, page, perPage) => {
    try {
      const data = await Song.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
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
          where: {
            name: { [Op.iLike]: `%${name}%` },
            genre: { [Op.iLike]: `%${genre}%` },
            artist: { [Op.iLike]: `%${artist}%` },
          },
        });
        return data;
      } else if (genre && !artist) {
        const data = await Song.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
            genre: { [Op.iLike]: `%${genre}%` },
          },
        });
        return data;
      } else {
        const data = await Song.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
            artist: { [Op.iLike]: `%${artist}%` },
          },
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

  async deleteSong(id) {
    const song = await song.findByPk(id);
    if (!song) {
      return { message: `No existe un usuario con ese ID` };
    }

    await song.destroy();
    return { message: "Usuario eliminado correctamente" };
  }

  restoreSong = async (id) => {
    try {
      const song = await Song.findByPk(id, { paranoid: false });
      if (!song) return { message: "no existe una cancion con ese ID" };

      await song.restore();
      return {
        result: true,
        message: "Cancion restaurada correctamente",
      };
    } catch (error) {
      return {
        result: false,
        error: error.message,
      };
    }
  };

  postSong = async (name, description, artist, genre, image, song) => {
    try {
      const existingSongName = await Song.findOne({ where: { name } });
      if (existingSongName) {
        return {
          error: "Ya existe una canción con ese nombre",
        };
      }

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
      return {
        error: error.message,
      };
    }
  };
  oderByName = async () => {
    // console.log("by name");
    try {
      const byName = await Song.findAll({ order: [["name", "ASC"]] });
      return byName;
    } catch (error) {
      return error;
    }
  };
  oderByDate = async () => {
    // console.log("by date");
    try {
      const byDate = await Song.findAll({ order: [["createdAt", "ASC"]] });
      return byDate;
    } catch (error) {
      return error;
    }
  };

  async pointSong(id, point) {
    try {
      console.log(point);
      const existing = await Song.findByPk(id);
      if (point > 5)
        return {
          message: "Point no puede ser mayor a 5",
        };
      if (!existing)
        return {
          message: "No existe cancion con ese id",
        };
      console.log(existing.dataValues);
      if (point) existing.dataValues.Points = point;

      const data = await existing.save();
      return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SongsControllers;
