const User = require("../Models/Users.model");
const Song = require("../Models/Songs.model");

class FavoriteSongController {
  constructor() {}

  postSong = async (name, description, artist, genre, image, song, id) => {
    // console.log("estas en el controllers de song");
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return {
          error: "Usuario no encontrado",
        };
      }
      //   const existingSongName = await Song.findOne({ where: { name } });
      //   if (existingSongName) {
      //     return {
      //       error: "Ya existe un favorito con ese nombre",
      //     };
      //   }
      const favoriteSong = await Song.create({
        name: name,
        description: description,
        artist: artist,
        genre: genre,
        song: song,
        image: image,
      });

      const addFavorites = await user.addFavoriteSong(favoriteSong);
      return addFavorites;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

module.exports = FavoriteSongController;
