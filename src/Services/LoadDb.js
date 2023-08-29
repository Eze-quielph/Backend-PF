const { sequelize } = require("../db");
const { User, Song } = sequelize.models;

class DataService {
  constructor(songs, users) {
    this.songs = songs;
    this.users = users;
  }

  async initialDate() {
    try {
      const userPromise = [];
      for (let { username, password, email } of this.users) {
        const validate = await User.findOne({ where: { email } });
        if (validate) {
          console.log(
            `User with email ${email} already exists. Skipping creation.`
          );
        } else {
          const newUser = {
            username,
            password,
            email,
          };
          userPromise.push(User.create(newSong));
        }
      }

      const songPromises = [];
      for (const {
        name,
        song, 
        description,
        artist,
        genre,
        image,
        isActive,
      } of this.songs) {
        const existingSong = await Song.findOne({ where: { name } });
        if (!existingSong) {
          const newSong = {
            name,
            song,
            description,
            artist,
            genre,
            image,
            isActive,
          };
          songPromises.push(Song.create(newSong));
        } else {
          console.log(
            `Song with name ${name} already exists. Skipping creation.`
          );
        }
      }
      await Promise.all(songPromises);
      await Promise.all(userPromise)
      console.log("Data initialization completed successfully.");
    } catch (error) {
      console.error("Error during data initialization:", error);
    }
  }
}

module.exports = DataService;
